import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline'

const features = [
  {
    name: 'Employ',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: CloudUploadIcon,
  },
  {
    name: 'Certificates',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple Job Posting',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: RefreshIcon,
  },
  {
    name: 'Diary operations',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ShieldCheckIcon,
  },

]

export default function InformationPacks() {
  return (
<div className="relative bg-black text-white py-16 sm:py-24 lg:py-32">
  <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
      Employ faster
    </h2>
    <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
      Everything you need
    </p>
    <p className="mx-auto mt-5 max-w-prose text-xl text-white/70">
      Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
      malesuada. Eleifend condimentum id viverra nulla.
    </p>

    <div className="mt-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="pt-6">
            <div className="flow-root rounded-lg border border-white/10 bg-white/5 px-6 pb-8 transition-colors hover:border-white/20">
              <div className="-mt-6">
                <div>
                  <span className="inline-flex items-center justify-center rounded-md bg-white/10 p-3 shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    {/* If an icon doesn't inherit color, add stroke-white or fill-white as needed */}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight">
                  {feature.name}
                </h3>
                <p className="mt-5 text-base text-white/70">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    
  </div>
</div>

  )
}