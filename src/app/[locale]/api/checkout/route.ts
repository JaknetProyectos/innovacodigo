import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      reference,
      customer,
      items,
      total,
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Monto inválido" },
        { status: 400 }
      );
    }

    if (!reference) {
      return NextResponse.json(
        { error: "Referencia requerida" },
        { status: 400 }
      );
    }

    if (!customer?.email) {
      return NextResponse.json(
        { error: "Correo del cliente requerido" },
        { status: 400 }
      );
    }

    const customerName = customer.nombre;

    const itemsHtml = (items ?? [])
      .map(
        (item: any) => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #ede9fe;font-size:14px;color:#1e1b4b;">
              ${item.nombre}
            </td>

            <td style="padding:14px 0;border-bottom:1px solid #ede9fe;text-align:center;font-size:14px;color:#6b7280;">
              ${item.cantidad ?? 1}
            </td>

            <td style="padding:14px 0;border-bottom:1px solid #ede9fe;text-align:right;font-size:14px;font-weight:600;color:#1e1b4b;">
              ${item.precioFormateado}
            </td>
          </tr>
        `
      )
      .join("");

    /**
     * CLIENT EMAIL
     */
    await resend.emails.send({
      from: "Innova Código <contacto@innovacodigo.com>",
      to: [customer.email],
      subject: `Confirmación de compra ${reference}`,
      html: `
        <div style="margin:0;padding:40px 20px;background:#f5f3ff;font-family:Inter,Arial,sans-serif;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:32px;overflow:hidden;border:1px solid #e9d5ff;box-shadow:0 20px 40px rgba(91,33,182,.08);">

            <!-- HERO -->
            <div style="background:linear-gradient(135deg,#6d28d9,#8b5cf6);padding:48px 40px;color:white;">
              <p style="margin:0 0 10px;font-size:12px;letter-spacing:.25em;text-transform:uppercase;opacity:.8;">
                Innova Código
              </p>

              <h1 style="margin:0;font-size:34px;line-height:1.1;font-weight:800;">
                Pago confirmado
              </h1>

              <p style="margin:16px 0 0;font-size:15px;opacity:.9;">
                Tu compra fue procesada correctamente.
              </p>
            </div>

            <!-- BODY -->
            <div style="padding:40px;">

              <p style="margin:0 0 8px;font-size:15px;color:#6b7280;">
                Hola,
              </p>

              <h2 style="margin:0 0 24px;font-size:26px;color:#1e1b4b;">
                ${customerName}
              </h2>

              <div style="background:#faf5ff;border:1px solid #ede9fe;border-radius:24px;padding:24px;margin-bottom:32px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                  <span style="color:#6b7280;">Referencia</span>
                  <strong style="color:#1e1b4b;">${reference}</strong>
                </div>

                <div style="display:flex;justify-content:space-between;">
                  <span style="color:#6b7280;">Total</span>
                  <strong style="font-size:22px;color:#6d28d9;">
                    ${total}
                  </strong>
                </div>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th align="left" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;">
                      Servicio
                    </th>

                    <th align="center" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;">
                      Cant.
                    </th>

                    <th align="right" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;">
                      Precio
                    </th>
                  </tr>
                </thead>

                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="margin-top:36px;padding-top:24px;border-top:1px solid #ede9fe;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#6b7280;">
                  Gracias por confiar en Innova Código. Si tienes dudas sobre tu compra,
                  puedes responder directamente a este correo.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    /**
     * BUSINESS EMAIL
     */
    await resend.emails.send({
      from: "Innova Código <contacto@innovacodigo.com>",
      to: ["contacto@innovacodigo.com"],
      subject: `Nuevo pedido ${reference}`,
      html: `
        <div style="margin:0;padding:40px 20px;background:#f5f3ff;font-family:Inter,Arial,sans-serif;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:32px;overflow:hidden;border:1px solid #ddd6fe;box-shadow:0 20px 40px rgba(91,33,182,.08);">

            <!-- HEADER -->
            <div style="background:#1e1b4b;padding:40px;color:white;">
              <p style="margin:0 0 10px;font-size:12px;letter-spacing:.25em;text-transform:uppercase;opacity:.8;">
                Nuevo Pedido
              </p>

              <h1 style="margin:0;font-size:32px;font-weight:800;">
                ${reference}
              </h1>
            </div>

            <!-- CONTENT -->
            <div style="padding:40px;">

              <div style="background:#faf5ff;border:1px solid #ede9fe;border-radius:24px;padding:24px;margin-bottom:32px;">
                <p style="margin:0 0 10px;color:#6b7280;">
                  <strong style="color:#1e1b4b;">Cliente:</strong>
                  ${customer.nombre}
                </p>

                <p style="margin:0 0 10px;color:#6b7280;">
                  <strong style="color:#1e1b4b;">Correo:</strong>
                  ${customer.email}
                </p>

                <p style="margin:0 0 10px;color:#6b7280;">
                  <strong style="color:#1e1b4b;">Teléfono:</strong>
                  ${customer.telefono}
                </p>

                <p style="margin:0;">
                  <strong style="color:#1e1b4b;">Total:</strong>
                  <span style="font-size:24px;font-weight:800;color:#6d28d9;margin-left:8px;">
                    ${total}
                  </span>
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th align="left" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;color:#6b7280;">
                      Servicio
                    </th>

                    <th align="center" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;color:#6b7280;">
                      Cant.
                    </th>

                    <th align="right" style="padding-bottom:14px;font-size:12px;text-transform:uppercase;color:#6b7280;">
                      Precio
                    </th>
                  </tr>
                </thead>

                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Emails enviados correctamente",
    });

  } catch (error) {
    console.error("CHECKOUT EMAIL ERROR:", error);

    return NextResponse.json(
      {
        error: "Error al enviar los emails",
      },
      {
        status: 500,
      }
    );
  }
}