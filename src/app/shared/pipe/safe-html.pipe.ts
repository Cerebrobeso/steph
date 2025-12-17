import {Pipe, PipeTransform, inject} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
	name: 'safeHtml',
	standalone: true // Rende il pipe auto-importabile
})
export class SafeHtmlPipe implements PipeTransform {
	private sanitizer = inject(DomSanitizer);
	// Inietta il DomSanitizer di Angular
	constructor() {}

	/**
	 * Trasforma una stringa HTML in un oggetto SafeHtml,
	 * che Angular può renderizzare in modo sicuro.
	 * @param value La stringa HTML da sanificare.
	 * @returns Un oggetto SafeHtml che può essere usato con [innerHTML].
	 */
	public transform(value: string): SafeHtml {
		// bypassSecurityTrustHtml dice ad Angular: "Fidati di me, so che questo HTML è sicuro".
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}
}
