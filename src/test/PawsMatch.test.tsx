import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PetCard } from '../components/PetCard'
import { FilterBar } from '../components/FilterBar'
import { MatchPanel } from '../components/MatchPanel'
import { filterPets } from '../services/petService'
import { pets } from '../data/pets'
import { Pet } from '../types'

const mockPet: Pet = {
  id: '1',
  name: 'Luna',
  breed: 'Golden Retriever',
  age: 2,
  type: 'dog',
  location: 'Guatemala City',
  bio: 'Soy una perrita amorosa.',
  imageUrl: 'https://example.com/dog.jpg',
}

describe('PetCard', () => {
  it('renders pet name and breed', () => {
    render(<PetCard pet={mockPet} onLike={() => {}} onPass={() => {}} />)
    expect(screen.getByText(/Luna/)).toBeInTheDocument()
    expect(screen.getByText(/Golden Retriever/)).toBeInTheDocument()
  })

  it('calls onLike when Adoptar button clicked', () => {
    const onLike = vi.fn()
    render(<PetCard pet={mockPet} onLike={onLike} onPass={() => {}} />)
    fireEvent.click(screen.getByTestId('like-button'))
    expect(onLike).toHaveBeenCalledTimes(1)
  })

  it('calls onPass when Pasar button clicked', () => {
    const onPass = vi.fn()
    render(<PetCard pet={mockPet} onLike={() => {}} onPass={onPass} />)
    fireEvent.click(screen.getByTestId('pass-button'))
    expect(onPass).toHaveBeenCalledTimes(1)
  })

  it('renders pet bio', () => {
    render(<PetCard pet={mockPet} onLike={() => {}} onPass={() => {}} />)
    expect(screen.getByText(/amorosa/)).toBeInTheDocument()
  })
})

describe('FilterBar', () => {
  it('renders type filters', () => {
    render(<FilterBar filters={{ type: 'Todos', location: 'Todas' }} onChange={() => {}} />)
    expect(screen.getByTestId('filter-type-Todos')).toBeInTheDocument()
    expect(screen.getByTestId('filter-type-dog')).toBeInTheDocument()
  })

  it('calls onChange when filter selected', () => {
    const onChange = vi.fn()
    render(<FilterBar filters={{ type: 'Todos', location: 'Todas' }} onChange={onChange} />)
    fireEvent.click(screen.getByTestId('filter-type-dog'))
    expect(onChange).toHaveBeenCalledWith({ type: 'dog', location: 'Todas' })
  })

  it('renders location select', () => {
    render(<FilterBar filters={{ type: 'Todos', location: 'Todas' }} onChange={() => {}} />)
    expect(screen.getByTestId('filter-location')).toBeInTheDocument()
  })
})

describe('MatchPanel', () => {
  it('shows empty state message', () => {
    render(<MatchPanel liked={[]} passed={[]} />)
    expect(screen.getByText(/no tienes matches/i)).toBeInTheDocument()
  })

  it('shows liked pet names', () => {
    render(<MatchPanel liked={[mockPet]} passed={[]} />)
    expect(screen.getByText('Luna')).toBeInTheDocument()
  })

  it('shows match count', () => {
    render(<MatchPanel liked={[mockPet]} passed={[]} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})

describe('filterPets', () => {
  it('returns all pets when filters are default', () => {
    const result = filterPets(pets, 'Todos', 'Todas')
    expect(result.length).toBe(pets.length)
  })

  it('filters by type dog', () => {
    const result = filterPets(pets, 'dog', 'Todas')
    result.forEach((p) => expect(p.type).toBe('dog'))
  })

  it('filters by location', () => {
    const result = filterPets(pets, 'Todos', 'Antigua')
    result.forEach((p) => expect(p.location).toBe('Antigua'))
  })

  it('filters by type and location combined', () => {
    const result = filterPets(pets, 'dog', 'Antigua')
    result.forEach((p) => {
      expect(p.type).toBe('dog')
      expect(p.location).toBe('Antigua')
    })
  })
})
