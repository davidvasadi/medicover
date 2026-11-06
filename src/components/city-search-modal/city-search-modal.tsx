import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import type { City } from "@/api/open-meteo";
import { useCitySearch } from "@/hooks/use-city-search";
import styles from "./city-search-modal.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canClose: boolean; // false until the user has picked a city
  onSelect: (city: City) => void;
};

export function CitySearchModal({
  open,
  onOpenChange,
  canClose,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const { data: cities = [], isFetching, isError } = useCitySearch(query);
  const searchText = query.trim();

  // one message at a time under the input
  let status = "";
  if (searchText.length >= 2) {
    if (isFetching) status = "Keresés…";
    else if (isError) status = "Nem sikerült a keresés, próbáld újra.";
    else if (cities.length === 0)
      status = `Nincs találat erre: „${searchText}”`;
  }

  function handleSelect(city: City) {
    onSelect(city);
    setQuery("");
  }

  // on first visit Esc and outside clicks shouldn't close the picker
  function keepOpenIfNeeded(event: Event) {
    if (!canClose) event.preventDefault();
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay}>
          <Dialog.Content
            className={styles.content}
            onEscapeKeyDown={keepOpenIfNeeded}
            onInteractOutside={keepOpenIfNeeded}
            aria-describedby={undefined}
          >
            <Dialog.Title className={styles.title}>Válassz várost</Dialog.Title>

            <input
              className={styles.input}
              type="search"
              placeholder="Város neve…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            {status && <p className={styles.status}>{status}</p>}

            <ul className={styles.list}>
              {cities.map((city) => (
                <li key={city.id}>
                  <button
                    type="button"
                    className={styles.result}
                    onClick={() => handleSelect(city)}
                  >
                    <span className={styles.cityName}>{city.name}</span>
                    {/* e.g. "Pest, Magyarország", helps tell same-named towns apart */}
                    <span className={styles.cityRegion}>
                      {[city.admin1, city.country].filter(Boolean).join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {canClose && (
              <Dialog.Close className={styles.close} aria-label="Bezárás">
                <XIcon size={20} />
              </Dialog.Close>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
