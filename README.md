# FinManager

## Interfejs
**Figma:** [Projekt](https://www.figma.com/file/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=0%3A1&mode=design&t=qab1VNXqR0Ig3nz4-1) / [Prototyp](https://www.figma.com/proto/tQ8YzVV6qm6BffaabQVOaT/VueApp?type=design&node-id=3-7&t=yFqBzfTVJ9b6nJ6t-1&scaling=scale-down&page-id=0%3A1&mode=design)

## Opis aplikacji
FinManager jest aplikacją internetową służącą do zarządzania finansami osobistymi. Aplikacja umożliwia wyznaczenie określonej bazowej kwoty oraz wprowadzanie w niej zmian poprzez dodawanie transakcji dokonanych przez użytkownika w ostatnim czasie. FinManager pozwala również na zapisanie posiadanych przez użytkownika papierów wartościowych oraz śledzenie ich notowań na giełdzie, przekazując użytkownikowi informacje o zyskach lub stratach od czasu kupna.

## Opis techniczny
FinManager działa w oparciu o technologie webowe, w szczególności framework Vue.js w wersji 3. Do zarządzania stanem aplikacji wykorzystano bibliotekę Vuex, natomiast poruszanie się po stronach jest możliwe dzięki komponentowi Vue Router. Do stworzenia innych komponentów aplikacji zastosowano Composition API.

## Widoki
>   * Widok startowy
>   * Widok logowania
>   * Widok rejestracji
>   * Widok strony głównej
>   * Widok profilu użytkownika
>   * Widok kalkulatora finansów
>   * Widok asystenta giełdowego
>   * Widok informacji o aplikacji

## Funkcje aplikacji
>   * Logowanie do serwisu
>   * Rejestracja konta użytkownika
>   * Konfiguracja konta użytkownika
>   * **Kalkulator finansów**
>       * Dodanie nowego kalkulatora i ustalenie kwoty bazowej
>       * Przypisanie kategorii i nazwy do kalkulatora (jedzenie, rozrywka, etc.)
>       * Dodanie transakcji zmniejszającej lub zwiększającej stan konta (+ data, notatka od użytkownika, etc.)
>       * Ustalenie dolnego limitu którego przekroczenie skutkuje powiadomieniem
>       * Zapisywanie transakcji w historii
>       * Wyszukiwanie konkretnej transakcji w historii
>   * **Asystent giełdowy**
>       * Dodanie posiadanych przez użytkownika papierów wartościowych
>       * Wyświetlenie obecnych notowań posiadanych papierów wartościowych w formie wykresu
>       * Wyświetlenie dodatkowych szczegółowych informacji o notowaniach
>       * Kalkulowanie strat/zysków na obecną chwilę