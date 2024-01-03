import {
  addDoc,
  query,
  collection,
  where,
  doc,
  getDocs,
  writeBatch,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { Task } from '@/models/task';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, subWeeks } from 'date-fns';

class Tasks {
  readonly #collectionName = 'tasks';

  add(task: Task) {
    return addDoc(collection(db, this.#collectionName), task.toJson());
  }

  update(scheduleId: string, payload: Partial<Task>) {
    const userRef = doc(db, this.#collectionName, scheduleId);

    return updateDoc(userRef, { ...payload });
  }

  addBatch(schedules: Task[]): Promise<void> {
    const batch = writeBatch(db);

    schedules.forEach((s) => {
      const docRef = doc(collection(db, this.#collectionName));
      batch.set(docRef, s.toJson());
    });

    return batch.commit();
  }

  async getForRange(workerId: string, start: Date, end: Date,frequency: string): Promise<Task[]> {
   
   
    const currentDate = new Date();
    let startTimestamp, endTimestamp;

    if (frequency === 'monthly') {
      startTimestamp = startOfMonth(currentDate);
      endTimestamp = endOfMonth(currentDate);
    } else if (frequency === 'weekly') {
      const currentWeekStartDate = startOfWeek(currentDate);

      // Calculate the end of the week based on the beginning of the week
      startTimestamp = currentWeekStartDate;
      endTimestamp = endOfWeek(currentWeekStartDate);
    } else if (frequency === 'biweekly') {
      startTimestamp = subWeeks(currentDate, 2); // Two weeks ago from the current date
      endTimestamp = currentDate;
    } else {
      // Handle other frequency options if necessary
      throw new Error('Invalid frequency');
    }
    
    const q = query(
      collection(db, this.#collectionName),
      where('workerId', '==', workerId),
      where('clockedIn', '>=', startTimestamp),
      where('clockedIn', '<=', endTimestamp),
    );
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const clockedIn = data.clockedIn.toDate();
      tasks.push({ id: doc.id, ...(data as Partial<Task>), clockedIn } as Task);
    });

    return tasks;
  }

  async getTasksForSchedule(
    userId: string,
    scheduleId: string,
  ): Promise<Task[]> {
    const q = query(
      collection(db, this.#collectionName),
      where('workerId', '==', userId),
      where('scheduleId', '==', scheduleId),
      orderBy('clockedIn', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const clockedIn = data.clockedIn.toDate();
      const clockedOut = data.clockedOut
        ? data.clockedOut.toDate()
        : data.clockedOut;
      tasks.push({
        id: doc.id,
        ...(data as Partial<Task>),
        clockedOut,
        clockedIn,
      } as Task);
    });

    return tasks;
  }
}

export const TaskRepository = new Tasks();
