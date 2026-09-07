import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Alpha-Desentupidora');

  constructor() {
    document.addEventListener('DOMContentLoaded', (): void => {
      const navToggle: HTMLElement | null = document.getElementById('navToggle');
      const mainNav: HTMLElement | null = document.getElementById('mainNav');

      if (navToggle && mainNav) {
        navToggle.addEventListener('click', (): void => {
          const isOpen: boolean = mainNav.classList.toggle('open');
          navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        const links: NodeListOf<HTMLAnchorElement> =
          mainNav.querySelectorAll<HTMLAnchorElement>('a');
        links.forEach((link: HTMLAnchorElement): void => {
          link.addEventListener('click', (): void => {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
          });
        });
      }

      const anoAtual: HTMLElement | null = document.getElementById('anoAtual');
      if (anoAtual) {
        anoAtual.textContent = String(new Date().getFullYear());
      }

      const header: Element | null = document.querySelector('.site-header');
      if (header instanceof HTMLElement) {
        const onScroll = (): void => {
          if (window.scrollY > 8) {
            header.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
          } else {
            header.style.boxShadow = 'none';
          }
        };

        document.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      }
    });
  }
}
