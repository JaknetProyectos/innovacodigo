import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
    } = body;

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos obligatorios",
        },
        { status: 400 }
      );
    }

    /**
     * EMAIL PARA EL NEGOCIO
     */
    await resend.emails.send({
      from: "Innova Código <contacto@innovacodigo.com>",
      to: ["contacto@innovacodigo.com"],
      replyTo: email,
      subject: `Nuevo contacto: ${asunto}`,

      html: `
        <div style="
          background:#f5f3ff;
          padding:40px 20px;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:640px;
            margin:0 auto;
            background:#ffffff;
            border-radius:32px;
            overflow:hidden;
            border:1px solid #ede9fe;
          ">
            
            <!-- Header -->
            <div style="
              background:linear-gradient(135deg,#6d28d9,#7c3aed);
              padding:40px;
              color:white;
            ">
              <p style="
                margin:0 0 10px;
                font-size:12px;
                letter-spacing:3px;
                text-transform:uppercase;
                opacity:.8;
              ">
                Nuevo mensaje
              </p>

              <h1 style="
                margin:0;
                font-size:32px;
                line-height:1.2;
                font-weight:700;
              ">
                Solicitud de contacto
              </h1>
            </div>

            <!-- Body -->
            <div style="padding:40px;">
              
              <div style="
                background:#faf5ff;
                border:1px solid #ede9fe;
                border-radius:24px;
                padding:24px;
                margin-bottom:24px;
              ">
                <p style="
                  margin:0 0 8px;
                  color:#6b7280;
                  font-size:13px;
                ">
                  Nombre
                </p>

                <p style="
                  margin:0;
                  color:#111827;
                  font-size:18px;
                  font-weight:600;
                ">
                  ${nombre}
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="
                      margin:0 0 6px;
                      color:#6b7280;
                      font-size:13px;
                    ">
                      Correo electrónico
                    </p>

                    <p style="
                      margin:0;
                      color:#111827;
                      font-size:15px;
                      font-weight:500;
                    ">
                      ${email}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="
                      margin:0 0 6px;
                      color:#6b7280;
                      font-size:13px;
                    ">
                      Teléfono
                    </p>

                    <p style="
                      margin:0;
                      color:#111827;
                      font-size:15px;
                      font-weight:500;
                    ">
                      ${telefono || "No proporcionado"}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="
                      margin:0 0 6px;
                      color:#6b7280;
                      font-size:13px;
                    ">
                      Asunto
                    </p>

                    <p style="
                      margin:0;
                      color:#111827;
                      font-size:15px;
                      font-weight:600;
                    ">
                      ${asunto}
                    </p>
                  </td>
                </tr>
              </table>

              <div style="
                margin-top:10px;
                background:#ffffff;
                border:1px solid #e5e7eb;
                border-radius:24px;
                padding:24px;
              ">
                <p style="
                  margin:0 0 14px;
                  color:#6b7280;
                  font-size:13px;
                ">
                  Mensaje
                </p>

                <p style="
                  margin:0;
                  color:#111827;
                  font-size:15px;
                  line-height:1.8;
                  white-space:pre-line;
                ">
                  ${mensaje}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    /**
     * EMAIL DE CONFIRMACIÓN PARA EL CLIENTE
     */
    await resend.emails.send({
      from: "Innova Código <contacto@innovacodigo.com>",
      to: [email],
      subject: "Recibimos tu mensaje | Innova Código",

      html: `
        <div style="
          background:#f5f3ff;
          padding:40px 20px;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:640px;
            margin:0 auto;
            background:#ffffff;
            border-radius:32px;
            overflow:hidden;
            border:1px solid #ede9fe;
          ">

            <!-- Header -->
            <div style="
              background:linear-gradient(135deg,#6d28d9,#7c3aed);
              padding:50px 40px;
              text-align:center;
              color:white;
            ">
              <p style="
                margin:0 0 10px;
                font-size:12px;
                letter-spacing:3px;
                text-transform:uppercase;
                opacity:.8;
              ">
                Innova Código
              </p>

              <h1 style="
                margin:0;
                font-size:34px;
                line-height:1.2;
                font-weight:700;
              ">
                Gracias por contactarnos
              </h1>
            </div>

            <!-- Body -->
            <div style="padding:48px 40px;">
              <h2 style="
                margin:0 0 18px;
                font-size:24px;
                color:#111827;
              ">
                Hola ${nombre},
              </h2>

              <p style="
                margin:0 0 20px;
                color:#4b5563;
                font-size:16px;
                line-height:1.8;
              ">
                Hemos recibido correctamente tu mensaje.
                Nuestro equipo revisará tu solicitud y te responderemos lo antes posible.
              </p>

              <div style="
                background:#faf5ff;
                border:1px solid #ede9fe;
                border-radius:24px;
                padding:24px;
                margin:32px 0;
              ">
                <p style="
                  margin:0 0 10px;
                  color:#6b7280;
                  font-size:13px;
                ">
                  Asunto
                </p>

                <p style="
                  margin:0;
                  color:#111827;
                  font-size:18px;
                  font-weight:600;
                ">
                  ${asunto}
                </p>
              </div>

              <p style="
                margin:0;
                color:#6b7280;
                font-size:14px;
                line-height:1.7;
              ">
                Innova Código transforma datos complejos en dashboards,
                automatizaciones y decisiones más inteligentes para tu negocio.
              </p>
            </div>

            <!-- Footer -->
            <div style="
              padding:24px 40px;
              border-top:1px solid #ede9fe;
              color:#9ca3af;
              font-size:12px;
              text-align:center;
            ">
              © 2026 Innova Código
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo enviar el formulario",
      },
      { status: 500 }
    );
  }
}