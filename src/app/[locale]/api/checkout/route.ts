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
            <td style="padding:18px 0;border-bottom:1px solid #f3e8ff;">
              <div>
                <p style="
                  margin:0;
                  color:#2e1065;
                  font-size:15px;
                  font-weight:700;
                ">
                  ${item.nombre}
                </p>

                <p style="
                  margin:6px 0 0;
                  color:#8b5cf6;
                  font-size:12px;
                ">
                  Servicio digital
                </p>
              </div>
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #f3e8ff;
              text-align:center;
              color:#6b7280;
              font-size:14px;
              font-weight:600;
            ">
              ${item.cantidad ?? 1}
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #f3e8ff;
              text-align:right;
              color:#581c87;
              font-size:15px;
              font-weight:800;
            ">
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
        <div style="
          margin:0;
          padding:50px 20px;
          background:#f8f4ff;
          font-family:Inter,Arial,sans-serif;
        ">

          <div style="
            max-width:760px;
            margin:0 auto;
          ">

            <!-- TOP BRAND -->
            <div style="
              text-align:center;
              margin-bottom:24px;
            ">
              <img
                src="https://innovacodigo.com/logo.png"
                alt="Innova Código"
                style="
                  width:90px;
                  height:auto;
                  margin-bottom:16px;
                "
              />

              <p style="
                margin:0;
                color:#8b5cf6;
                font-size:12px;
                font-weight:700;
                letter-spacing:.28em;
                text-transform:uppercase;
              ">
                Compra confirmada
              </p>
            </div>

            <!-- CARD -->
            <div style="
              background:#ffffff;
              border-radius:40px;
              overflow:hidden;
              border:1px solid #eadcff;
              box-shadow:0 30px 70px rgba(139,92,246,.12);
            ">

              <!-- HERO -->
              <div style="
                position:relative;
                background:
                  radial-gradient(circle at top left,#c084fc 0%,transparent 35%),
                  radial-gradient(circle at bottom right,#7c3aed 0%,transparent 40%),
                  linear-gradient(135deg,#6d28d9,#4c1d95);
                padding:70px 50px 120px;
                color:white;
              ">

                <div style="
                  position:absolute;
                  top:-80px;
                  right:-80px;
                  width:220px;
                  height:220px;
                  border-radius:999px;
                  background:rgba(255,255,255,.08);
                "></div>

                <div style="
                  position:absolute;
                  bottom:-60px;
                  left:-60px;
                  width:180px;
                  height:180px;
                  border-radius:999px;
                  background:rgba(255,255,255,.06);
                "></div>

                <p style="
                  margin:0 0 18px;
                  font-size:13px;
                  font-weight:700;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                  opacity:.85;
                ">
                  Innova Código
                </p>

                <h1 style="
                  margin:0;
                  font-size:48px;
                  line-height:1;
                  font-weight:900;
                  max-width:420px;
                ">
                  Gracias por tu compra
                </h1>

                <p style="
                  margin:22px 0 0;
                  font-size:17px;
                  line-height:1.8;
                  max-width:520px;
                  color:rgba(255,255,255,.9);
                ">
                  Tu pago fue aprobado correctamente y ya comenzamos
                  a preparar tu servicio.
                </p>
              </div>

              <!-- FLOATING SUMMARY -->
              <div style="
                margin:-70px auto 0;
                width:calc(100% - 60px);
                background:white;
                border-radius:32px;
                border:1px solid #f3e8ff;
                box-shadow:0 20px 50px rgba(139,92,246,.12);
                position:relative;
                z-index:10;
              ">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="
                      padding:30px;
                      border-right:1px solid #f3e8ff;
                    ">


                    <td style="padding:30px;">
                      <p style="
                        margin:0 0 8px;
                        color:#a78bfa;
                        font-size:12px;
                        font-weight:700;
                        text-transform:uppercase;
                        letter-spacing:.15em;
                      ">
                        Total pagado
                      </p>

                      <p style="
                        margin:0;
                        color:#7c3aed;
                        font-size:32px;
                        font-weight:900;
                      ">
                        ${total}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CONTENT -->
              <div style="padding:50px;">

                <div style="
                  margin-bottom:36px;
                ">
                  <p style="
                    margin:0 0 10px;
                    color:#6b7280;
                    font-size:15px;
                  ">
                    Cliente
                  </p>

                  <h2 style="
                    margin:0;
                    color:#2e1065;
                    font-size:30px;
                    font-weight:900;
                  ">
                    ${customerName}
                  </h2>
                </div>

                <!-- SERVICES -->
                <div style="
                  border:1px solid #f3e8ff;
                  border-radius:30px;
                  padding:30px;
                  background:linear-gradient(180deg,#ffffff,#faf5ff);
                ">

                  <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:24px;
                  ">
                    <div>
                      <p style="
                        margin:0 0 6px;
                        color:#8b5cf6;
                        font-size:12px;
                        font-weight:700;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Resumen
                      </p>

                      <h3 style="
                        margin:0;
                        color:#2e1065;
                        font-size:26px;
                        font-weight:900;
                      ">
                        Servicios adquiridos
                      </h3>
                    </div>

                  </div>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr>
                        <th align="left" style="
                          padding-bottom:14px;
                          color:#a78bfa;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Servicio
                        </th>

                        <th align="center" style="
                          padding-bottom:14px;
                          color:#a78bfa;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Cant.
                        </th>

                        <th align="right" style="
                          padding-bottom:14px;
                          color:#a78bfa;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Precio
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      ${itemsHtml}
                    </tbody>
                  </table>
                </div>

                <!-- CTA -->
                <div style="
                  margin-top:40px;
                  background:linear-gradient(135deg,#faf5ff,#f3e8ff);
                  border-radius:30px;
                  padding:32px;
                  border:1px solid #e9d5ff;
                ">
                  <h3 style="
                    margin:0 0 14px;
                    color:#581c87;
                    font-size:22px;
                    font-weight:900;
                  ">
                    ¿Qué sigue ahora?
                  </h3>

                  <p style="
                    margin:0;
                    color:#6b7280;
                    font-size:15px;
                    line-height:1.9;
                  ">
                    Nuestro equipo revisará tu pedido y comenzaremos el proceso.
                    Si necesitas información adicional o quieres agregar algo más,
                    puedes responder directamente a este correo.
                  </p>
                </div>

              </div>

              <!-- FOOTER -->
              <div style="
                padding:30px 40px;
                background:#faf5ff;
                border-top:1px solid #f3e8ff;
                text-align:center;
              ">
                <p style="
                  margin:0 0 10px;
                  color:#581c87;
                  font-size:14px;
                  font-weight:700;
                ">
                  Innova Código
                </p>

                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:12px;
                  line-height:1.7;
                ">
                  Automatizaciones, dashboards y desarrollo inteligente para empresas modernas.
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
        <div style="
          margin:0;
          padding:50px 20px;
          background:#f4f0ff;
          font-family:Inter,Arial,sans-serif;
        ">

          <div style="
            max-width:760px;
            margin:0 auto;
            background:white;
            border-radius:38px;
            overflow:hidden;
            border:1px solid #e9d5ff;
            box-shadow:0 25px 60px rgba(124,58,237,.12);
          ">

            <!-- HEADER -->
            <div style="
              background:
                linear-gradient(135deg,#5b21b6,#7c3aed,#a855f7);
              padding:40px;
              position:relative;
              overflow:hidden;
            ">

              <div style="
                position:absolute;
                top:-60px;
                right:-60px;
                width:180px;
                height:180px;
                border-radius:999px;
                background:rgba(255,255,255,.08);
              "></div>

              <img
                src="https://innovacodigo.com/logo.png"
                alt="Innova Código"
                style="
                  width:70px;
                  height:auto;
                  margin-bottom:24px;
                  position:relative;
                  z-index:2;
                "
              />

              <p style="
                margin:0 0 12px;
                color:rgba(255,255,255,.75);
                font-size:12px;
                font-weight:700;
                letter-spacing:.22em;
                text-transform:uppercase;
                position:relative;
                z-index:2;
              ">
                Nuevo checkout recibido
              </p>

              <h1 style="
                margin:0;
                color:white;
                font-size:38px;
                font-weight:900;
                position:relative;
                z-index:2;
              ">
                ${reference}
              </h1>
            </div>

            <!-- CONTENT -->
            <div style="padding:40px;">

              <!-- CUSTOMER -->
              <div style="
                background:linear-gradient(135deg,#faf5ff,#ffffff);
                border:1px solid #f3e8ff;
                border-radius:30px;
                padding:30px;
                margin-bottom:32px;
              ">

                <div style="
                  display:flex;
                  justify-content:space-between;
                  align-items:flex-start;
                  gap:20px;
                ">

                  <div>
                    <p style="
                      margin:0 0 8px;
                      color:#8b5cf6;
                      font-size:12px;
                      text-transform:uppercase;
                      letter-spacing:.18em;
                      font-weight:700;
                    ">
                      Cliente
                    </p>

                    <h2 style="
                      margin:0 0 18px;
                      color:#2e1065;
                      font-size:30px;
                      font-weight:900;
                    ">
                      ${customer.nombre}
                    </h2>

                    <p style="
                      margin:0 0 10px;
                      color:#6b7280;
                      font-size:15px;
                    ">
                      ${customer.email}
                    </p>

                    <p style="
                      margin:0;
                      color:#6b7280;
                      font-size:15px;
                    ">
                      ${customer.telefono}
                    </p>
                  </div>

                  <div style="
                    background:#7c3aed;
                    color:white;
                    border-radius:24px;
                    padding:22px 26px;
                    min-width:180px;
                    text-align:center;
                  ">
                    <p style="
                      margin:0 0 8px;
                      font-size:11px;
                      text-transform:uppercase;
                      letter-spacing:.15em;
                      opacity:.8;
                    ">
                      Total
                    </p>

                    <p style="
                      margin:0;
                      font-size:30px;
                      font-weight:900;
                    ">
                      ${total}
                    </p>
                  </div>

                </div>
              </div>

              <!-- TABLE -->
              <div style="
                border:1px solid #f3e8ff;
                border-radius:30px;
                padding:30px;
              ">

                <div style="
                  margin-bottom:24px;
                ">
                  <p style="
                    margin:0 0 8px;
                    color:#8b5cf6;
                    font-size:12px;
                    text-transform:uppercase;
                    letter-spacing:.18em;
                    font-weight:700;
                  ">
                    Pedido
                  </p>

                  <h3 style="
                    margin:0;
                    color:#2e1065;
                    font-size:28px;
                    font-weight:900;
                  ">
                    Servicios comprados
                  </h3>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <thead>
                    <tr>
                      <th align="left" style="
                        padding-bottom:14px;
                        color:#a78bfa;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
                        Servicio
                      </th>

                      <th align="center" style="
                        padding-bottom:14px;
                        color:#a78bfa;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
                        Cant.
                      </th>

                      <th align="right" style="
                        padding-bottom:14px;
                        color:#a78bfa;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
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