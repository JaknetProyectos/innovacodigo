// app/api/checkout/etomin/route.ts

import { NextRequest, NextResponse } from "next/server";

import { createEtominPayment } from "@/lib/etomin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      reference,
      customerInformation,
      cardData,
      items,
    } = body;

    /**
     * Basic validations
     */
    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          error: "Monto inválido",
        },
        {
          status: 400,
        }
      );
    }

    if (!reference) {
      return NextResponse.json(
        {
          error: "Referencia requerida",
        },
        {
          status: 400,
        }
      );
    }

    if (!customerInformation?.email) {
      return NextResponse.json(
        {
          error: "Email requerido",
        },
        {
          status: 400,
        }
      );
    }

    if (!cardData?.cardNumber) {
      return NextResponse.json(
        {
          error: "Tarjeta requerida",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create payment
     */
    const paymentResult = await createEtominPayment({
      amount,
      reference,
      customerInformation,
      cardData,
    });

    console.log(paymentResult)

    /**
     * Failed payment
     */
    if (!paymentResult.success) {
      return NextResponse.json(
        {
          error:
            paymentResult.error ||
            "No se pudo procesar el pago",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Here you can:
     * - Save order to DB
     * - Send confirmation email
     * - Trigger invoice
     * - Notify Slack/Discord
     */

    return NextResponse.json({
      success: true,

      message: "Pago procesado correctamente",

      payment: paymentResult.data,

      order: {
        reference,
        amount,
        items,
        customerEmail: customerInformation.email,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("CHECKOUT API ERROR:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      {
        status: 500,
      }
    );
  }
}