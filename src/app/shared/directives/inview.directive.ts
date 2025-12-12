import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  input,
  output,
  effect,
  inject,
  signal,
  afterNextRender,
} from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);

  inViewClass = input<string>('in-view');
  scrollContainer = input<string>('');
  triggerOnce = input<boolean>(false);

  inView = output<boolean>();
  isVisible = signal<boolean>(false);

  private observer?: IntersectionObserver;
  private hasTriggered = false;

  constructor() {
    // Effetto per gestire la classe
    effect(() => {
      const className = this.inViewClass();
      const visible = this.isVisible();

      if (visible) {
        this.elementRef.nativeElement.classList.add(className);
      } else if (!this.triggerOnce() || !this.hasTriggered) {
        this.elementRef.nativeElement.classList.remove(className);
      }
    });

    // Aspetta che il DOM sia renderizzato
    afterNextRender(() => {
      this.setupObserver();
    });
  }

  ngOnInit() {
    // L'observer viene settato in afterNextRender
  }

  private setupObserver() {
    const containerSelector = this.scrollContainer();
    let rootElement: HTMLElement | null = null;

    if (containerSelector) {
      rootElement = document.querySelector(containerSelector);

      if (!rootElement) {
        // console.error(`⚠️ Container "${containerSelector}" non trovato! Observer non configurato.`);
        return;
      }

      // console.log(`✅ Observer configurato con container:`, rootElement);
    } else {
      // console.log('ℹ️ Observer configurato con viewport di default');
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const isIntersecting = entry.isIntersecting && ratio >= 0.9;

          /*console.log('📊 Intersection:', {
            element: (entry.target as HTMLElement).id,
            isIntersecting: entry.isIntersecting,
            ratio: ratio.toFixed(2),
            visible: isIntersecting
          });*/

          this.isVisible.set(isIntersecting);
          this.inView.emit(isIntersecting);

          if (isIntersecting && this.triggerOnce() && !this.hasTriggered) {
            this.hasTriggered = true;
            this.observer?.disconnect();
          }
        });
      },
      {
        root: rootElement,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    );

    this.observer.observe(this.elementRef.nativeElement);
    // console.log('👀 Osservando elemento:', this.elementRef.nativeElement.id);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
