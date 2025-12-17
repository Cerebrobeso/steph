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
  Inject,
  DOCUMENT,
  AfterViewInit,
} from '@angular/core';
@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);

  inViewClass = input('in-view');
  offsetPx = input(280);

  inView = output<boolean>();
  isVisible = signal(false);

  private isBrowser: boolean;
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.isBrowser = typeof window !== 'undefined';

    effect(() => {
      const className = this.inViewClass();
      const visible = this.isVisible();

      if (visible) {
        this.elementRef.nativeElement.classList.add(className);
        this.inView.emit(true);
      } else {
        this.elementRef.nativeElement.classList.remove(className);
        this.inView.emit(false);
      }
    });
    afterNextRender(() => {
      this.setupObserver();
    });
  }

  ngAfterViewInit() {}

  private setupObserver() {
    if (!this.isBrowser) {
      return;
    }

    const main = this.document.querySelector('html');
    if (!main) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const box = entry.boundingClientRect;
          const parentBox = entry.rootBounds;
          if (!parentBox) return;

          const offsetTop = box.top - parentBox.top;

          /*if (
            entry.isIntersecting &&
            offsetTop <= this.offsetPx() &&
            offsetTop >= -this.offsetPx()
          ) {
            console.log('entry', {
              target: entry.target.id,
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
              one: offsetTop + '<=' + this.offsetPx(),
              two: offsetTop + '>=' + -this.offsetPx(),
            });
          }*/

          this.isVisible.set(
            entry.isIntersecting && offsetTop <= this.offsetPx() && offsetTop >= -this.offsetPx(),
          );
        });
      },
      {
        root:  this.document,
        rootMargin: '-120px',
        threshold: [0.6, 0.7, 0.8, 0.9],
      },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
