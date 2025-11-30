import { createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

// Contexto para controlar el estado desde afuera
const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

// Provider que recibe open y setOpen desde tu NavBar
export const SidebarProvider = ({ children, open, setOpen }) => {
    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({ children, open, setOpen }) => (
    <SidebarProvider open={open} setOpen={setOpen}>
        {children}
    </SidebarProvider>
);

// Sidebar principal desktop
export const SidebarBody = ({ className, children }) => {
    const { open, setOpen } = useSidebar();

    return (
        <>
            {/* Backdrop/Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={cn(
                            "fixed top-0 left-0 h-full w-[280px] bg-neutral-100 dark:bg-neutral-900 shadow-xl border-r border-neutral-300 dark:border-neutral-700 z-50 overflow-y-auto",
                            className
                        )}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                            aria-label="Cerrar sidebar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-neutral-700 dark:text-neutral-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className="pt-16 px-3">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Links del sidebar
export const SidebarLink = ({ children, onClick, href, icon }) => {
    const Component = href ? "a" : "button";

    return (
        <Component
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 w-full py-3 px-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition rounded-md text-sm text-neutral-800 dark:text-neutral-200"
        >
            {icon && <span className="text-lg">{icon}</span>}
            <span>{children}</span>
        </Component>
    );
};
