// @frontend/core/event/EventEmitter.ts
type Listener<T> = (event: T) => void;

export class EventEmitter<T> {
  private listeners = new Set<Listener<T>>();

  emit(event: T) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
