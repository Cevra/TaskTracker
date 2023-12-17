import {
  addDoc,
  query,
  collection,
  where,
  doc,
  getDocs,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from 'firebaseConfig';
import { Schedule } from '@/models/schedule';

class Schedules {
  readonly #collectionName = 'schedules';

  add(schedule: Schedule) {
    return addDoc(collection(db, this.#collectionName), schedule.toJson());
  }

  addBatch(schedules: Schedule[]): Promise<void> {
    const batch = writeBatch(db);

    schedules.forEach((s) => {
      const docRef = doc(collection(db, this.#collectionName));
      batch.set(docRef, s.toJson());
    });

    return batch.commit();
  }

  async getForRang(
    userId: string,
    start: Date,
    end: Date,
  ): Promise<Record<string, Schedule>> {
    const startTimestamp = Timestamp.fromDate(start);
    const endTimestamp = Timestamp.fromDate(end);

    const q = query(
      collection(db, this.#collectionName),
      where('createdById', '==', userId),
      where('scheduledAt', '>=', startTimestamp),
      where('scheduledAt', '<=', endTimestamp),
    );
    const querySnapshot = await getDocs(q);
    const schedules: Record<string, Schedule> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.scheduledAt.toDate();
      const key = format(date, 'yyyy-MM-dd');
      schedules[key] = { id: doc.id, scheduledAt: date, ...data } as Schedule;
    });

    return schedules;
  }
}

export const ScheduleRepository = new Schedules();
