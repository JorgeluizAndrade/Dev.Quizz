import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const companyName = "Dev.Quizz"
  const developerName = "Jorge Luiz Andarade"

  return (
    <footer className="w-full border-t bg-background py-8 ">
      <div className="container flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Developer</h3>
            <p className="text-base font-medium">{developerName}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <Link
              href="mailto:joao.silva@example.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>luizj1718@gmail.com</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Rio de Janeiro, RJ - Brasil</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Social Medias</h3>
            <Link
              href="https://www.linkedin.com/in/jorge-andradesouza/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {companyName}, desenvolved by  {developerName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}

