import {
  addDoc,
  query,
  collection,
  where,
  doc,
  getDocs,
  writeBatch,
  updateDoc,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from 'firebaseConfig';
import { Schedule } from '@/models/schedule';
import { ScheduleMember } from 'types';

class Schedules {
  readonly #collectionName = 'schedules';

  add(schedule: Schedule) {
    return addDoc(collection(db, this.#collectionName), schedule.toJson());
  }

  update(scheduleId: string, payload: Partial<Schedule>) {
    const userRef = doc(db, this.#collectionName, scheduleId);

    return updateDoc(userRef, { ...payload });
  }

  addBatch(schedules: Schedule[]): Promise<void> {
    const batch = writeBatch(db);

    schedules.forEach((s) => {
      const docRef = doc(collection(db, this.#collectionName));
      batch.set(docRef, s.toJson());
    });

    return batch.commit();
  }

  async getWorkersForDay(date: Date): Promise<ScheduleMember[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('scheduledAt', '==', format(date, 'yyyy-MM-dd')),
    );

    const querySnapshot = await getDocs(q);
    const members: Record<string, ScheduleMember> = {};
    querySnapshot.forEach((doc) => {
      const schedule = doc.data() as Schedule;
      schedule.workers?.map((w) => {
        members[w.id] = w;
      });
    });

    return Object.values(members);
  }

  async getWorkersForDays(dates: string[]): Promise<ScheduleMember[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('scheduledAt', 'in', dates),
    );

    const querySnapshot = await getDocs(q);
    const members: Record<string, ScheduleMember> = {};
    querySnapshot.forEach((doc) => {
      const schedule = doc.data() as Schedule;
      schedule.workers?.map((w) => {
        members[w.id] = w;
      });
    });

    return Object.values(members);
  }

  async getForRange(
    userId: string,
    type: 'worker' | 'company',
    start: Date,
    end: Date,
  ): Promise<Record<string, Schedule>> {
    const [s, e] = [format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd')];

    const q = query(
      collection(db, this.#collectionName),
      type === 'company'
        ? where('createdById', '==', userId)
        : where('workerIds', 'array-contains', userId),
      where('scheduledAt', '>=', s),
      where('scheduledAt', '<=', e),
    );
    const querySnapshot = await getDocs(q);
    const schedules: Record<string, Schedule> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Schedule;
      schedules[data.scheduledAt] = { id: doc.id, ...data } as Schedule;
    });

    return schedules;
  }
}

export const ScheduleRepository = new Schedules();
