import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://innovacodigo.com/logo.png";

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
          background:#f3f0ff;
          padding:40px 20px;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:720px;
            margin:0 auto;
            background:#ffffff;
            border-radius:36px;
            overflow:hidden;
            border:1px solid #e9d5ff;
            box-shadow:0 25px 60px rgba(109,40,217,0.08);
          ">

            <!-- HERO -->
            <div style="
              background:linear-gradient(135deg,#4c1d95 0%, #6d28d9 45%, #8b5cf6 100%);
              padding:48px 42px;
              position:relative;
              overflow:hidden;
            ">
              <div style="
                position:absolute;
                top:-120px;
                right:-120px;
                width:260px;
                height:260px;
                background:rgba(255,255,255,0.08);
                border-radius:999px;
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Innova Código"
                style="
                  width:170px;
                  margin-bottom:28px;
                  display:block;
                "
              />

              <p style="
                margin:0 0 12px;
                color:rgba(255,255,255,0.75);
                font-size:12px;
                font-weight:600;
                letter-spacing:4px;
                text-transform:uppercase;
              ">
                Nuevo lead recibido
              </p>

              <h1 style="
                margin:0;
                color:white;
                font-size:38px;
                line-height:1.15;
                font-weight:800;
                max-width:500px;
              ">
                Solicitud de contacto desde el sitio web
              </h1>

              <p style="
                margin:18px 0 0;
                color:rgba(255,255,255,0.82);
                font-size:16px;
                line-height:1.7;
                max-width:520px;
              ">
                Se recibió un nuevo mensaje desde el formulario de contacto de Innova Código.
              </p>
            </div>

            <!-- BODY -->
            <div style="padding:42px;">

              <!-- USER CARD -->
              <div style="
                background:linear-gradient(180deg,#faf5ff 0%, #ffffff 100%);
                border:1px solid #ede9fe;
                border-radius:28px;
                padding:28px;
                margin-bottom:28px;
              ">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="
                        margin:0 0 8px;
                        color:#8b5cf6;
                        font-size:12px;
                        font-weight:700;
                        letter-spacing:2px;
                        text-transform:uppercase;
                      ">
                        Cliente
                      </p>

                      <h2 style="
                        margin:0;
                        color:#111827;
                        font-size:28px;
                        line-height:1.2;
                        font-weight:800;
                      ">
                        ${nombre}
                      </h2>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style="
                        height:1px;
                        background:#ede9fe;
                        margin:0 0 24px;
                      "></div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:18px;">
                      <p style="
                        margin:0 0 6px;
                        color:#6b7280;
                        font-size:12px;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      ">
                        Correo electrónico
                      </p>

                      <p style="
                        margin:0;
                        color:#111827;
                        font-size:16px;
                        font-weight:600;
                      ">
                        ${email}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:18px;">
                      <p style="
                        margin:0 0 6px;
                        color:#6b7280;
                        font-size:12px;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      ">
                        Teléfono
                      </p>

                      <p style="
                        margin:0;
                        color:#111827;
                        font-size:16px;
                        font-weight:600;
                      ">
                        ${telefono || "No proporcionado"}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p style="
                        margin:0 0 6px;
                        color:#6b7280;
                        font-size:12px;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      ">
                        Asunto
                      </p>

                      <p style="
                        margin:0;
                        color:#111827;
                        font-size:18px;
                        font-weight:700;
                      ">
                        ${asunto}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- MESSAGE -->
              <div style="
                border:1px solid #e5e7eb;
                border-radius:28px;
                overflow:hidden;
              ">
                <div style="
                  background:#faf5ff;
                  padding:18px 24px;
                  border-bottom:1px solid #ede9fe;
                ">
                  <p style="
                    margin:0;
                    color:#6d28d9;
                    font-size:13px;
                    font-weight:700;
                    letter-spacing:1px;
                    text-transform:uppercase;
                  ">
                    Mensaje del cliente
                  </p>
                </div>

                <div style="padding:28px 24px;">
                  <p style="
                    margin:0;
                    color:#374151;
                    font-size:16px;
                    line-height:1.9;
                    white-space:pre-line;
                  ">
                    ${mensaje}
                  </p>
                </div>
              </div>

              <!-- FOOTER -->
              <div style="
                margin-top:32px;
                padding-top:28px;
                border-top:1px solid #ede9fe;
              ">
                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:13px;
                  line-height:1.7;
                ">
                  Este mensaje fue enviado automáticamente desde el formulario de contacto de Innova Código.
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
          background:#f3f0ff;
          padding:40px 20px;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:720px;
            margin:0 auto;
            background:#ffffff;
            border-radius:36px;
            overflow:hidden;
            border:1px solid #e9d5ff;
            box-shadow:0 25px 60px rgba(109,40,217,0.08);
          ">

            <!-- HERO -->
            <div style="
              background:linear-gradient(135deg,#4c1d95 0%, #6d28d9 45%, #8b5cf6 100%);
              padding:56px 42px;
              text-align:center;
              position:relative;
              overflow:hidden;
            ">
              <div style="
                position:absolute;
                top:-120px;
                left:-120px;
                width:260px;
                height:260px;
                background:rgba(255,255,255,0.08);
                border-radius:999px;
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Innova Código"
                style="
                  width:190px;
                  margin:0 auto 28px;
                  display:block;
                "
              />

              <p style="
                margin:0 0 14px;
                color:rgba(255,255,255,0.75);
                font-size:12px;
                font-weight:700;
                letter-spacing:4px;
                text-transform:uppercase;
              ">
                Mensaje recibido
              </p>

              <h1 style="
                margin:0;
                color:white;
                font-size:42px;
                line-height:1.15;
                font-weight:800;
              ">
                Gracias por contactarnos
              </h1>

              <p style="
                margin:20px auto 0;
                max-width:520px;
                color:rgba(255,255,255,0.82);
                font-size:17px;
                line-height:1.8;
              ">
                Ya recibimos tu mensaje y nuestro equipo revisará tu solicitud para responderte lo antes posible.
              </p>
            </div>

            <!-- BODY -->
            <div style="padding:48px 42px;">

              <h2 style="
                margin:0 0 18px;
                color:#111827;
                font-size:30px;
                line-height:1.2;
                font-weight:800;
              ">
                Hola ${nombre},
              </h2>

              <p style="
                margin:0 0 24px;
                color:#4b5563;
                font-size:16px;
                line-height:1.9;
              ">
                Gracias por confiar en Innova Código.
                Estamos emocionados de conocer más sobre tu proyecto y ayudarte a construir soluciones digitales modernas, automatizadas y escalables.
              </p>

              <!-- SUMMARY -->
              <div style="
                background:linear-gradient(180deg,#faf5ff 0%, #ffffff 100%);
                border:1px solid #ede9fe;
                border-radius:28px;
                padding:28px;
                margin-bottom:28px;
              ">
                <p style="
                  margin:0 0 10px;
                  color:#8b5cf6;
                  font-size:12px;
                  font-weight:700;
                  letter-spacing:2px;
                  text-transform:uppercase;
                ">
                  Asunto de tu mensaje
                </p>

                <h3 style="
                  margin:0;
                  color:#111827;
                  font-size:24px;
                  line-height:1.4;
                  font-weight:800;
                ">
                  ${asunto}
                </h3>
              </div>

              <!-- MESSAGE -->
              <div style="
                border:1px solid #ede9fe;
                border-radius:28px;
                overflow:hidden;
                margin-bottom:32px;
              ">
                <div style="
                  background:#faf5ff;
                  padding:18px 24px;
                  border-bottom:1px solid #ede9fe;
                ">
                  <p style="
                    margin:0;
                    color:#6d28d9;
                    font-size:13px;
                    font-weight:700;
                    letter-spacing:1px;
                    text-transform:uppercase;
                  ">
                    Tu mensaje
                  </p>
                </div>

                <div style="padding:28px 24px;">
                  <p style="
                    margin:0;
                    color:#4b5563;
                    font-size:15px;
                    line-height:1.9;
                    white-space:pre-line;
                  ">
                    ${mensaje}
                  </p>
                </div>
              </div>

              <!-- INFO -->
              <div style="
                background:#111827;
                border-radius:28px;
                padding:32px;
                color:white;
              ">
                <p style="
                  margin:0 0 14px;
                  font-size:12px;
                  letter-spacing:3px;
                  text-transform:uppercase;
                  color:#c4b5fd;
                ">
                  Innova Código
                </p>

                <h3 style="
                  margin:0 0 16px;
                  font-size:28px;
                  line-height:1.3;
                  font-weight:800;
                ">
                  Tecnología con visión de negocio
                </h3>

                <p style="
                  margin:0;
                  color:#d1d5db;
                  font-size:15px;
                  line-height:1.9;
                ">
                  Creamos dashboards, automatizaciones, plataformas y soluciones digitales enfocadas en eficiencia, crecimiento y escalabilidad.
                </p>
              </div>
            </div>

            <!-- FOOTER -->
            <div style="
              border-top:1px solid #ede9fe;
              padding:28px 40px;
              text-align:center;
            ">
              <p style="
                margin:0 0 8px;
                color:#6b7280;
                font-size:13px;
              ">
                © 2026 Innova Código
              </p>

              <p style="
                margin:0;
                color:#9ca3af;
                font-size:12px;
              ">
                contacto@innovacodigo.com
              </p>
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
      { status:500 }
    );
  }
}