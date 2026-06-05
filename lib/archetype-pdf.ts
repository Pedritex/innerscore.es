// Maps an archetype name (base or evolved, masculine or feminine form)
// to the matching pre-built PDF in public/reports/. The actual scoring
// in lib/scoring.ts uses "El Ancla Evolucionada" (feminine), but we keep
// both forms here so a typo or future masculine variant still resolves.

const MAP: Record<string, string> = {
  'El Ancla': 'informe-el-ancla.pdf',
  'El Ancla Evolucionada': 'informe-el-ancla.pdf',
  'El Ancla Evolucionado': 'informe-el-ancla.pdf',
  'El Conector': 'informe-el-conector.pdf',
  'El Conector Evolucionado': 'informe-el-conector.pdf',
  'El Empático': 'informe-el-empatico.pdf',
  'El Empático Evolucionado': 'informe-el-empatico.pdf',
  'El Impulsor': 'informe-el-impulsor.pdf',
  'El Impulsor Evolucionado': 'informe-el-impulsor.pdf',
  'El Observador': 'informe-el-observador.pdf',
  'El Observador Evolucionado': 'informe-el-observador.pdf',
};

const DEFAULT_PDF = 'informe-el-observador.pdf';

export function getArchetypePdfPath(archetype: string): string {
  return MAP[archetype] ?? DEFAULT_PDF;
}
