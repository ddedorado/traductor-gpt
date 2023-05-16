import { environment } from '../../environment/environment';
import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {
  
  traduccion: BehaviorSubject<string> = new BehaviorSubject<string>('');
  traduccion$: Observable<string> = this.traduccion.asObservable();

  constructor(private http: HttpClient) { }

  getTraduccion(): Observable<string> {
    return this.traduccion$;
  }

  setTraduccion(newTraduccion: string) {
    return this.traduccion.next(newTraduccion);
  } 

  traducirTexto(prompt: string) {
    const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.OPENAI_API_KEY}`
    };
    
    const requestData = {
      model: 'text-davinci-003',
      prompt: prompt,
    };

    this.http.post<any>(`${ environment.OPENAI_URI }/completions`, requestData, {
      headers: requestHeaders
    }).subscribe(
      {
        next: (response) => {
          this.setTraduccion(response.choices[0].text.trim());
          console.log('HOla Mundo')
        },
        error:error => {
          console.error(error);
        }
      }
    )
  }
}
