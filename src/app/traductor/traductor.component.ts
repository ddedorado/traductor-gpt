import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TraductorService } from './traductor.service';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.scss']
})
export class TraductorComponent {
  textoOriginal: string;
  textoTraducido: string;
  idiomaSeleccionado: string;

  idiomasDisponibles: Array<any> = [
    {
      code: 'español',
      text: 'Español'
    },
    {
      code: 'francés',
      text: 'Francés'
    },
    {
      code: 'inglés',
      text: 'Inglés'
    },
    {
      code: 'italiano',
      text: 'Italiano'
    },
    {
      code: 'portugués',
      text: 'Portugués'
    },
    {
      code: 'árabe',
      text: 'Árabe'
    },
    {
      code: 'chino',
      text: 'Chino'
    }
  ]

  constructor(public traductorService: TraductorService) {
    this.idiomaSeleccionado = this.idiomasDisponibles[0].code;
  }

  traducir() {
    const prompt = `Traduceme este texto en ${ this.idiomaSeleccionado }: ${ this.textoOriginal }`;
    this.traductorService.traducirTexto(prompt);
  }
}
