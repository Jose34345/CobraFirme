export type IssueId = 'transferencia' | 'qr' | 'alternativas' | 'avisos' | 'conciliacion';
export type Issue = {
  id: IssueId;
  short: string;
  title: string;
  description: string;
  canDo: string[];
  confirm: string[];
  prepare: string[];
  avoid: string[];
};

export const issues: Issue[] = [
  {
    id: 'transferencia', short: 'Transferencias', title: 'No estoy recibiendo transferencias',
    description: 'Separá un problema del proveedor de un error en los datos que compartís.',
    canDo: [
      'Revisá en la aplicación oficial si tu cuenta está habilitada para recibir transferencias.',
      'Comprobá que el alias y número de cuenta que compartís corresponden a esa cuenta.',
      'Verificá con el pagador el estado del envío sin asumir que un comprobante equivale a dinero acreditado.',
    ],
    confirm: ['Consultá con tu entidad el estado del servicio, los límites y posibles demoras.', 'Si usabas Ueno, verificá los comunicados actuales del BCP antes de usar instrucciones de terceros.'],
    prepare: ['Nombre del comercio', 'Medio de cobro que utilizabas', 'Lista de operaciones pendientes con fechas e importes, sin datos de tarjetas'],
    avoid: ['No entregues mercadería basándote únicamente en una captura de transferencia.', 'No compartas claves, tokens ni códigos de verificación.'],
  },
  {
    id: 'qr', short: 'Código QR', title: 'Necesito cambiar o revisar mi QR',
    description: 'El QR debe apuntar a una cuenta habilitada y estar respaldado por el proveedor.',
    canDo: ['Identificá quién emitió tu QR actual y si sigue vigente.', 'Consultá los requisitos del proveedor de QR que elegiste.', 'Cuando el nuevo QR esté activo, reemplazá las copias impresas y digitales.'],
    confirm: ['Validá con la procesadora si tu QR es interoperable, sus tarifas y plazos de acreditación.', 'Realizá una operación pequeña de prueba con otra persona, sin compartir claves.'],
    prepare: ['Lista de puntos donde exhibís el QR', 'Documentación comercial que solicite el proveedor', 'Canal para enviar la nueva imagen a clientes'],
    avoid: ['No generes ni difundas QR que apunten a cuentas de terceros.', 'No reutilices un QR viejo sin comprobar el destino del pago.'],
  },
  {
    id: 'alternativas', short: 'Otro medio', title: 'Quiero ofrecer otro medio de cobro',
    description: 'Elegí el medio según la forma en que te pagan tus clientes, no por rumores.',
    canDo: ['Anotá cuánto cobrás por transferencias, QR, tarjetas y enlaces.', 'Compará comisiones, requisitos, tiempos de acreditación y atención al comercio.', 'Elegí vos la entidad y solicitá el alta por sus canales oficiales.'],
    confirm: ['Confirmá requisitos de cuenta, RUC o cédula con el proveedor.', 'Verificá por escrito las condiciones y la activación antes de anunciar el nuevo medio.'],
    prepare: ['Rubros y canales de venta', 'Volumen aproximado de cobros', 'Documentación exigida por el proveedor elegido'],
    avoid: ['No pagues a terceros para acelerar supuestas aperturas sin verificar identidad.', 'No permitas que terceros reciban pagos destinados a tu negocio.'],
  },
  {
    id: 'avisos', short: 'Avisar clientes', title: 'Tengo que avisar nuevos datos a mis clientes',
    description: 'Reducí confusiones cuando cambia la cuenta de cobro.',
    canDo: ['Confirmá primero que el nuevo medio funciona.', 'Actualizá WhatsApp Business, redes, catálogo, presupuestos y facturas donde corresponda.', 'Enviá un aviso claro que permita verificar el nuevo titular.'],
    confirm: ['Comprobá con tu entidad cómo mostrar de forma correcta el nombre del titular.', 'Pedí a clientes frecuentes que confirmen los nuevos datos antes de pagar.'],
    prepare: ['Lista de canales a actualizar', 'Nombre del titular de la cuenta confirmado', 'Mensaje institucional breve y consistente'],
    avoid: ['No incluyas imágenes de credenciales o datos sensibles en los avisos.', 'No envíes enlaces acortados o poco claros como única prueba del cambio.'],
  },
  {
    id: 'conciliacion', short: 'Pagos pendientes', title: 'Necesito ordenar pagos pendientes',
    description: 'Controlá qué está realmente acreditado y qué necesita revisión.',
    canDo: ['Anotá fecha, referencia, importe, cliente y estado de cada cobro.', 'Contrastá los pagos con el movimiento real de la cuenta habilitada.', 'Separá acreditado, pendiente y en revisión; resolvé cada excepción con evidencia.'],
    confirm: ['Solicitá un extracto oficial cuando los movimientos no coincidan.', 'Confirmá los tiempos de liquidación con tu entidad o procesadora.'],
    prepare: ['Planilla de pendientes', 'Comprobantes comerciales no sensibles', 'Extracto o detalle oficial de movimientos disponible para el titular'],
    avoid: ['No marques como acreditado un pago solo por una captura.', 'No compartas extractos completos con personas no autorizadas.'],
  },
];

export function getIssue(id: string): Issue | undefined { return issues.find((item) => item.id === id); }

export function planAsText(issue: Issue): string {
  const section = (title: string, items: string[]) => `${title}:\n${items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`;
  return [`CobráFirme — ${issue.title}`, section('Lo que podés revisar', issue.canDo), section('Consultá con tu proveedor', issue.confirm), section('Prepará', issue.prepare), section('Evitá', issue.avoid), 'Información general. No somos una entidad financiera ni gestionamos tus fondos.', 'Fuentes oficiales y guía: https://www.bcp.gov.py/en/noticias'].join('\n\n');
}

export const customerMessage = 'Hola. Actualizamos nuestro medio de cobro. Antes de transferir, verificá que el titular sea [NOMBRE DEL TITULAR] y usá únicamente los datos nuevos que te compartimos por nuestros canales habituales: [DATOS CONFIRMADOS]. Si tenés dudas, consultanos directamente. ¡Gracias!';
