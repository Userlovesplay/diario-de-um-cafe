import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CollapsibleFacts({ facts, color }: { facts: string[], color: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mt-16 w-full max-w-2xl mx-auto border-t border-current/20 pt-6">
      <Collapsible.Trigger className="flex items-center justify-between w-full text-sm uppercase tracking-widest font-sans hover:opacity-70 transition-opacity" style={{ color }}>
        <span>{open ? '− Recolher' : '+ Saiba mais sobre este capítulo'}</span>
      </Collapsible.Trigger>
      
      <AnimatePresence>
        {open && (
          <Collapsible.Content asChild forceMount>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-8 pb-4">
                <p className="font-serif italic text-lg opacity-60 mb-6" style={{ color }}>Notas de campo</p>
                <ul className="space-y-4">
                  {facts.map((fact, i) => (
                    <li key={i} className="font-sans text-sm font-light leading-relaxed flex items-start gap-4" style={{ color }}>
                      <span className="opacity-50 mt-1 block h-1 w-1 bg-current rounded-full shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Collapsible.Content>
        )}
      </AnimatePresence>
    </Collapsible.Root>
  );
}
