/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { IconBrandSpeedtest, IconCloudFilled, IconDropletHalf2Filled, IconSearch, IconTemperatureCelsius, IconWind } from "@tabler/icons-react"
import Image from "next/image"
import { useEffect, useState } from "react"
export default function CardWeather() {
    const [clima, setclima] = useState({} as any)
    const [cidade, setCidade] = useState("")

    console.log(clima)

    useEffect(() => {
        async function Weather() {
            const res = await fetch(`/api/weather?cidade=${encodeURIComponent("São Paulo")}`)
            const dados = await res.json()
            setclima(dados)
        }
        Weather()
    }, [])

    async function BuscarClima(cidade: string) {
        if(cidade == null || cidade == undefined || cidade == "") return
        const res = await fetch(`/api/weather?cidade=${encodeURIComponent(cidade)}`)
        const dados = await res.json()
        setclima(dados)
    }

    console.log(typeof clima.cod)

    return (
        <div className="rounded-2xl p-3 backdrop-blur-sm w-full md:w-80 lg:w-96">
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                    <IconCloudFilled size={40}></IconCloudFilled>
                    <span className="text-base font-bold">Tempo Agora</span>
                </div>
                <div className="flex bg-white/40 px-2 py-1 rounded-2xl justify-between items-center text-center">
                    <input type="text" name="" id="" placeholder="Digite a cidade..." className="outline-none text-gray-900 w-3/4" onChange={(e) => setCidade(e.target.value)} onKeyDown={(e) => e.key === "Enter" && BuscarClima(cidade)} />
                    <button onClick={() => BuscarClima(cidade)} className="cursor-pointer">
                        <IconSearch></IconSearch>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-3xl font-bold flex flex-wrap justify-center text-center items-center gap-1">{clima.name ? clima.name : clima.error}<span className="text-base">{clima.sys?.country}</span></span>
                    <span className="text-sm text-gray-300">{clima.weather?.[0]?.description}</span>
                    <div><Image src={'/cloudsun.png'} width={120} height={120} alt="Nuvem e sol"></Image></div>
                    <span className="text-3xl font-bold flex justify-center items-center">{clima.main ? Math.floor(clima.main?.temp) : '0'} <IconTemperatureCelsius/></span>
                    <span className="font-bold flex items-center">Sensação {clima.main ? Math.floor(clima.main?.feels_like) : '0'} <IconTemperatureCelsius/></span>
                </div>
                <div className="flex justify-center bg-black/30 py-2 rounded-2xl">
                    <div className="flex flex-col items-center gap-1 px-3 w-1/3">
                        <IconWind />
                        <span className="text-xs">Vento</span>
                        <div className="flex gap-1 items-center bg-neutral-500/50 rounded-md px-2 w-full justify-center">
                            <span className="text-sm">{clima.wind ? Math.floor(clima.wind?.speed) : '0'}</span>
                            <span className="text-xs">km/h</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center px-3 gap-1 border-r border-l border-gray-600 w-1/3">
                        <IconDropletHalf2Filled />
                        <span className="text-xs">Umidade</span>
                        <div className="flex gap-1 items-center bg-neutral-500/50 rounded-md px-2 w-full justify-center">
                            <span className="text-sm">{clima.main ? clima.main.humidity : "0"}</span>
                            <span className="text-xs">%</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 px-3 w-1/3">
                        <IconBrandSpeedtest />
                        <span className="text-xs">Pressão</span>
                        <div className="flex gap-1 items-center bg-neutral-500/50 rounded-md px-2 w-full justify-center">
                            <span className="text-sm">{clima.main? clima.main.pressure : '0'}</span>
                            <span className="text-xs">hPa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}