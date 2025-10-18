export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-24 w-24 animate-pulse">
          <img
            src="/logo.jpg"
            alt="Ruqya Healing"
            className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-screen"
          />
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
