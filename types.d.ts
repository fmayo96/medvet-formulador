interface Window {
  electron: { hi: (data) => Promise<string> };
}

type EventPayloadMapping = {
  hi: string;
};

Species =
  "Perro Adulto" |
  "Gato Adulto" |
  "Perro Cachorro" |
  "Gato Cachorro" |
  "Perra Lactancia" |
  "Gata Lactania" |
  "Perra Pre";
