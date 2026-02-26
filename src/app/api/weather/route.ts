import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cidade = searchParams.get("cidade");

    if (!cidade) {
      return NextResponse.json(
        { error: "Cidade é obrigatória" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.WEATHER_KEY}&units=metric&lang=pt_br`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Cidade/País não encontrado." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}