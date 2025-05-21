"use client";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

const Settings = () => {
  return (
    <PageTransition>
        <section className="w-full px-[15px] py-[35px] flex flex-col gap-[30px]">
            <h3 className="text-[1.5rem] text-start pl-[15px] text-darkPrimary font-semibold">Ajustes</h3>
            <div className="w-full flex flex-col place-items-start gap-[10px]">
                <Link href="/dashboard/settings/myaccount" className="w-full">
                    <div className="settingsLinks">
                        <span>Datos personales</span>
                        <RightArrowIcon />
                    </div>
                </Link>
                <Link href="" className="w-full">
                    <div className="settingsLinks">
                        <span>Cambiar contraseña</span>
                        <RightArrowIcon />
                    </div>
                </Link>
                <div className="w-full">
                    <div className="settingsLinks">
                        <span>Cerrar cuenta</span>
                        <RightArrowIcon />
                    </div>
                </div>
            </div>
        </section>
    </PageTransition>
  )
};

export default Settings;