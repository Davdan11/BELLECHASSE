import { buildAvailability, getArea, SLOTS, LEAD_HOURS, HORIZON_DAYS } from '../../../../lib/booking';
import { listBookings } from '../../../../lib/bookingStore';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const areaSlug = searchParams.get('secteur') || '';
  const area = getArea(areaSlug);
  if (!area) {
    return Response.json({ ok: false, error: 'invalid_area' }, { status: 400 });
  }

  let bookings;
  try {
    bookings = await listBookings();
  } catch (err) {
    console.error('[rendez-vous] lecture des réservations impossible', err);
    return Response.json({ ok: false, error: 'storage_unavailable' }, { status: 503 });
  }

  const availability = buildAvailability(area.slug, bookings);
  return Response.json(
    {
      ok: true,
      area: { slug: area.slug, name: area.name, label: area.label },
      slots: SLOTS.map(({ id, label }) => ({ id, label })),
      leadHours: LEAD_HOURS,
      horizonDays: HORIZON_DAYS,
      ...availability,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
