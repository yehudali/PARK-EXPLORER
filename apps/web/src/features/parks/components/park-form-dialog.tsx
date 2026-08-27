import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCities } from '@/features/filters/hooks/useCities'
import { useRegions } from '@/features/filters/hooks/useRegions'
import { messageFor } from '@/lib/errors'
import { useCreatePark, useUpdatePark } from '../hooks/useParkMutations'
import { parkFormSchema, type ParkFormValues } from '../schemas'
import type { ParkDetail } from '../types'

const EMPTY: ParkFormValues = {
  name: '',
  description: '',
  regionId: '',
  cityId: '',
  openingDate: '',
  latitude: '',
  longitude: '',
}

// One dialog for both jobs. Given a park it edits; given none it creates.
export function ParkFormDialog({
  park,
  open,
  onOpenChange,
}: {
  park?: ParkDetail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const isEdit = park !== undefined
  const create = useCreatePark()
  const update = useUpdatePark()

  const form = useForm<ParkFormValues>({
    resolver: zodResolver(parkFormSchema),
    defaultValues: EMPTY,
  })

  // Reset every time it opens, so a cancelled edit does not leak into the next
  // one and a fresh create never starts half filled.
  useEffect(() => {
    if (!open) return

    if (park) {
      const [longitude, latitude] = park.location.coordinates
      form.reset({
        name: park.name,
        description: park.description ?? '',
        // The park carries its city but not its region, so the region starts
        // empty and only matters if the city is being changed.
        regionId: '',
        cityId: park.cityId,
        openingDate: park.openingDate ?? '',
        latitude: String(latitude),
        longitude: String(longitude),
      })
    } else {
      form.reset(EMPTY)
    }
  }, [open, park, form])

  // useWatch rather than form.watch: the latter returns a fresh function every
  // render, which the React compiler cannot memoize safely.
  const regionId = useWatch({ control: form.control, name: 'regionId' })
  const cityId = useWatch({ control: form.control, name: 'cityId' })
  const regions = useRegions()
  const cities = useCities(regionId || undefined)

  const regionItems: Record<string, string> = {}
  for (const region of regions.data ?? []) regionItems[region.id] = region.name

  const cityItems: Record<string, string> = {}
  // Seeded with the park's own city, so editing shows the right label before
  // any region is chosen and the list has loaded.
  if (park) cityItems[park.cityId] = park.cityName
  for (const city of cities.data ?? []) cityItems[city.id] = city.name

  const errors = form.formState.errors
  const isPending = create.isPending || update.isPending

  function onSubmit(values: ParkFormValues) {
    const payload = {
      name: values.name,
      description: values.description?.trim() || undefined,
      cityId: values.cityId,
      openingDate: values.openingDate || undefined,
      // GeoJSON order is longitude first, which is the opposite of how the
      // fields read on screen.
      location: {
        type: 'Point' as const,
        coordinates: [Number(values.longitude), Number(values.latitude)],
      },
    }

    const options = {
      onSuccess: () => {
        toast.success(isEdit ? 'Park updated.' : 'Park created.')
        onOpenChange(false)
      },
      onError: (error: unknown) => toast.error(messageFor(error)),
    }

    if (park) update.mutate({ id: park.id, ...payload }, options)
    else create.mutate(payload, options)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit park' : 'New park'}</DialogTitle>
          <DialogDescription>
            Only the name, the city and the location are required.
          </DialogDescription>
        </DialogHeader>

        <form
          id="park-form"
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="park-name">Name</FieldLabel>
              <Input id="park-name" dir="auto" {...form.register('name')} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="park-description">Description</FieldLabel>
              <Textarea
                id="park-description"
                dir="auto"
                rows={3}
                {...form.register('description')}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Region</FieldLabel>
                <Select
                  items={regionItems}
                  value={regionId || null}
                  onValueChange={(value) => {
                    form.setValue('regionId', String(value))
                    // Same rule as the filter bar: a new region means the old
                    // city no longer belongs.
                    form.setValue('cityId', '')
                  }}
                >
                  <SelectTrigger className="w-full" aria-label="Region">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(regionItems).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field data-invalid={Boolean(errors.cityId)}>
                <FieldLabel>City</FieldLabel>
                <Select
                  items={cityItems}
                  value={cityId || null}
                  disabled={!regionId && !park}
                  onValueChange={(value) =>
                    form.setValue('cityId', String(value), {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full" aria-label="City">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(cityItems).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.cityId]} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="park-opening">Opening date</FieldLabel>
              <Input
                id="park-opening"
                type="date"
                className="w-48"
                {...form.register('openingDate')}
              />
            </Field>

            <Field>
              <FieldLabel>Location</FieldLabel>
              <div className="grid grid-cols-2 gap-4">
                <Field data-invalid={Boolean(errors.latitude)}>
                  <Input
                    aria-label="Latitude"
                    placeholder="31.7820"
                    {...form.register('latitude')}
                  />
                  <FieldDescription>Latitude</FieldDescription>
                  <FieldError errors={[errors.latitude]} />
                </Field>
                <Field data-invalid={Boolean(errors.longitude)}>
                  <Input
                    aria-label="Longitude"
                    placeholder="35.2050"
                    {...form.register('longitude')}
                  />
                  <FieldDescription>Longitude</FieldDescription>
                  <FieldError errors={[errors.longitude]} />
                </Field>
              </div>
              <FieldDescription>
                Decimal degrees, as they appear on the park detail screen.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form="park-form" disabled={isPending}>
            {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create park'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
