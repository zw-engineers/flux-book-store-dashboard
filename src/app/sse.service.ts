import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor(private ngZone: NgZone) {}

  getServerSentEvent(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        this.ngZone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this.ngZone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
