"use client"

import * as React from "react"
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline"

import { MouseFollowCaption } from "@/components/core/hooverimage"
import { Button } from "@/components/core/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/core/accordion"

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

type FeatureItem = {
  name: string
  description: string
  information: string
  icon: IconType
}

type FaqItem = {
  name: "FAQ"
  description: string
  information?: string
  icon: IconType
  faqs: { q: string; a: string }[]
}

type Item = FeatureItem | FaqItem

const items: Item[] = [
  {
    name: "Employ",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: Post roles, shortlist candidates, and schedule interviews from a single dashboard. Integrates with email and calendar.",
    icon: CloudUploadIcon,
  },
  {
    name: "Certificates",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: Store and verify herd health, food safety, and compliance docs. Automated expiry reminders included.",
    icon: LockClosedIcon,
  },
  {
    name: "Simple Job Posting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: Create a posting in under 60 seconds with templates for seasonal, part-time, and full-time roles.",
    icon: RefreshIcon,
  },
  {
    name: "Diary operations",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: Log tasks, milk yields, feed schedules, and field work. Searchable timeline with export to CSV.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Powerful API",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: REST endpoints for jobs, workers, and records. OAuth2 support and rate-limited webhooks.",
    icon: CogIcon,
  },
  {
    name: "Database Backups",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    information:
      "Example: Daily encrypted snapshots with 30-day retention. One-click restore to a point in time.",
    icon: ServerIcon,
  },
  {
    name: "FAQ",
    description: "Common questions about AgriForce features, pricing, and data.",
    icon: QuestionMarkCircleIcon,
    faqs: [
      {
        q: "What is AgriForce?",
        a: "A platform to hire, certify, and manage agricultural staff with tools for daily operations.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes—14 days with full access. No credit card required.",
      },
      {
        q: "How do I post a job?",
        a: "Create a role from the dashboard, choose a template, and publish to connected boards in one step.",
      },
      {
        q: "Can I verify certificates?",
        a: "Upload documents or connect issuers; automated checks and expiry reminders are included.",
      },
      {
        q: "Do you have an API?",
        a: "Yes—REST API with OAuth2. Webhooks available for job and record events.",
      },
      {
        q: "How is data secured?",
        a: "Encryption at rest and in transit, role-based access, and audited backups.",
      },
      {
        q: "What support is included?",
        a: "Email support for all plans; priority chat for Business and Enterprise.",
      },
      {
        q: "Can I export my data?",
        a: "Anytime—CSV and JSON exports from settings, or via API.",
      },
    ],
  },
]

/** Shine card with auto-run on mount + hover re-trigger */
const CardShine: React.FC<{
  icon: IconType
  title: string
  description: string
}> = ({ icon: Icon, title, description }) => {
  const [autoShine, setAutoShine] = React.useState(false)
  const [resetting, setResetting] = React.useState(false)

  React.useEffect(() => {
    const start = setTimeout(() => setAutoShine(true), 50)
    const stop = setTimeout(() => {
      setResetting(true)
      setAutoShine(false)
      const reenable = setTimeout(() => setResetting(false), 40)
      return () => clearTimeout(reenable)
    }, 1700)
    return () => {
      clearTimeout(start)
      clearTimeout(stop)
    }
  }, [])

  return (
    <div
      className={[
        "relative h-full overflow-hidden rounded-3xl border border-neutral-800",
        "bg-neutral-950",
        "bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)]",
        "bg-[length:250%_250%,100%_100%]",
        "bg-[position:-100%_0,0_0]",
        "bg-no-repeat p-8 shadow-2xl",
        "transition-[background-position]",
        "hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]",
        autoShine ? "bg-[position:200%_0,0_0] duration-[1500ms]" : "",
        resetting ? "transition-none" : "",
        "cursor-pointer",
      ].join(" ")}
    >
      <div className="mb-4">
        <Icon className="h-8 w-8 text-neutral-400" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-medium tracking-tight text-neutral-100">{title}</h3>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>
  )
}

export default function InformationPacks() {
  return (
    <div className="relative bg-black text-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
          Employ faster
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything you need to know
        </p>
        <p className="mx-auto mt-1.5 max-w-prose text-xl text-white/70">
          Phasellus lorem quam molestie id quisque diam aenean nulla in.
          Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
          condimentum id viverra nulla.
        </p>

        <MouseFollowCaption />

 <div className="mt-3">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Dialog key={item.name}>
                <DialogTrigger asChild>
                  <div>
                    <CardShine
                      icon={item.icon}
                      title={item.name}
                      description={item.description}
                    />
                  </div>
                </DialogTrigger>

                {/* UPDATED: solid black background + white text */}
                <DialogContent className="sm:max-w-[560px] bg-black text-white border-white/10">
                  <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                    {"faqs" in item ? (
                      <DialogDescription className="text-white/80">
                        {item.description}
                      </DialogDescription>
                    ) : (
                      <DialogDescription className="space-y-3 text-white/80">
                        <p>{item.description}</p>
                        {"information" in item && <p>{item.information}</p>}
                      </DialogDescription>
                    )}
                  </DialogHeader>

                  {"faqs" in item && (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="faq-0"
                    >
                      {item.faqs.map((f, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-white">
                            {f.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-white/80">
                            {f.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
