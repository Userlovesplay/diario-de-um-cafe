import { Card, CardContent } from "@/components/ui/card";
import { Coffee, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <Card className="w-full max-w-lg mx-4 border-0 shadow-lg bg-background/80 backdrop-blur">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 relative">
              <Coffee className="h-20 w-20 text-primary/60" />
              <span className="absolute -top-2 -right-2 text-4xl font-serif text-primary/40">?</span>
            </div>

            <h1 className="text-6xl font-serif font-normal text-foreground mb-2">404</h1>
            <h2 className="text-2xl font-serif font-normal text-foreground/80 mb-4">
              Página não encontrada
            </h2>

            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              Parece que este grão foi moído muito fino e escorreu por entre os dedos.
              A página que você procura não existe em nosso diário.
            </p>

            <Link href="/">
              <Button className="gap-2 font-sans">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Diário
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
