import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Port, SearchFilters, MapBounds } from "../../types";

interface PortsState {
  ports: Port[];
  filteredPorts: Port[];
  selectedPort: Port | null;
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  mapBounds: MapBounds | null;
}

const initialState: PortsState = {
  ports: [],
  filteredPorts: [],
  selectedPort: null,
  loading: false,
  error: null,
  searchFilters: {},
  mapBounds: null,
};

// Async thunks
export const fetchPorts = createAsyncThunk(
  "ports/fetchPorts",
  async (filters?: SearchFilters) => {
    // Simulate API call - replace with actual API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Comprehensive mock data for demonstration
    const mockPorts: Port[] = [
      {
        id: "1",
        name: "Marina Bay Harbor",
        portType: "marina" as const,
        location: {
          lat: 40.7589,
          lng: -73.9851,
          city: "New York",
          country: "USA",
          address: "123 Harbor Drive, New York, NY 10001",
        },
        description:
          "Premium marina in the heart of Manhattan with world-class amenities and stunning city skyline views.",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Fuel",
          "Restaurant",
          "Security",
        ],
        capacity: 150,
        availableSpaces: 23,
        pricePerNight: 85,
        rating: 4.7,
        reviews: [
          {
            id: "1",
            userId: "user1",
            userName: "Captain John",
            userAvatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
            portId: "1",
            rating: 5,
            comment:
              "Excellent facilities and perfect location in Manhattan. Staff was very helpful!",
            createdAt: "2024-12-01T10:00:00Z",
            helpful: 12,
          },
        ],
        contact: {
          phone: "+1-555-0123",
          email: "info@marinabay.com",
          website: "https://marinabay.com",
        },
        specifications: {
          maxBoatLength: 80,
          depth: 12,
          electricity: true,
          water: true,
          wifi: true,
          fuel: true,
          security: true,
        },
      },
      {
        id: "2",
        name: "Port de Cannes",
        portType: "marina" as const,
        location: {
          lat: 43.5528,
          lng: 7.0174,
          city: "Cannes",
          country: "France",
          address: "Quai Max Laubeuf, 06400 Cannes, France",
        },
        description:
          "Luxury marina on the French Riviera, perfect for Mediterranean cruising and film festival visits.",
        images: [
          "https://images.unsplash.com/photo-1582719471385-477bb200d50d?w=800",
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Concierge",
          "Restaurant",
          "Security",
        ],
        capacity: 200,
        availableSpaces: 45,
        pricePerNight: 120,
        rating: 4.9,
        reviews: [
          {
            id: "2",
            userId: "user2",
            userName: "Marie Dubois",
            userAvatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50",
            portId: "2",
            rating: 5,
            comment:
              "Magnifique marina! Perfect for exploring the Côte d'Azur.",
            createdAt: "2024-11-28T14:30:00Z",
            helpful: 8,
          },
        ],
        contact: {
          phone: "+33-4-93-99-00-00",
          email: "contact@portcannes.fr",
          website: "https://portcannes.fr",
        },
        specifications: {
          maxBoatLength: 100,
          depth: 15,
          electricity: true,
          water: true,
          wifi: true,
          fuel: true,
          security: true,
        },
      },
      {
        id: "3",
        name: "Barcelona Port Olympic",
        portType: "marina" as const,
        location: {
          lat: 41.3874,
          lng: 2.1963,
          city: "Barcelona",
          country: "Spain",
          address: "Moll de Gregal, 08005 Barcelona, Spain",
        },
        description:
          "Modern marina in Barcelona's Olympic port with excellent dining and nightlife nearby.",
        images: [
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73786?w=800",
          "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Fuel",
          "Restaurant",
          "Security",
        ],
        capacity: 120,
        availableSpaces: 31,
        pricePerNight: 75,
        rating: 4.6,
        reviews: [
          {
            id: "3",
            userId: "user3",
            userName: "Carlos Rodriguez",
            userAvatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50",
            portId: "3",
            rating: 4,
            comment:
              "Great location near the beach and city center. Good value for money.",
            createdAt: "2024-12-03T09:15:00Z",
            helpful: 6,
          },
        ],
        contact: {
          phone: "+34-93-225-7940",
          email: "info@portolimpic.com",
          website: "https://portolimpic.com",
        },
        specifications: {
          maxBoatLength: 70,
          depth: 10,
          electricity: true,
          water: true,
          wifi: true,
          fuel: true,
          security: true,
        },
      },
      {
        id: "4",
        name: "Miami Beach Marina",
        portType: "marina" as const,
        location: {
          lat: 25.7617,
          lng: -80.1918,
          city: "Miami Beach",
          country: "USA",
          address: "300 Alton Rd, Miami Beach, FL 33139",
        },
        description:
          "Tropical paradise marina in the heart of South Beach with art deco surroundings.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1601408208058-f29796442e4c?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Fuel",
          "Restaurant",
          "Security",
        ],
        capacity: 180,
        availableSpaces: 52,
        pricePerNight: 95,
        rating: 4.8,
        reviews: [],
        contact: {
          phone: "+1-305-673-7730",
          email: "info@miamibeachmarina.com",
          website: "https://miamibeachmarina.com",
        },
        specifications: {
          maxBoatLength: 90,
          depth: 14,
          electricity: true,
          water: true,
          wifi: true,
          fuel: true,
          security: true,
        },
      },
      {
        id: "5",
        name: "Sydney Harbour Marina",
        portType: "marina" as const,
        location: {
          lat: -33.8568,
          lng: 151.2153,
          city: "Sydney",
          country: "Australia",
          address: "Darling Harbour, Sydney NSW 2000",
        },
        description:
          "Iconic marina with spectacular views of the Sydney Opera House and Harbour Bridge.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800",
        ],
        amenities: ["WiFi", "Electricity", "Water", "Restaurant", "Security"],
        capacity: 160,
        availableSpaces: 28,
        pricePerNight: 110,
        rating: 4.7,
        reviews: [],
        contact: {
          phone: "+61-2-9281-5999",
          email: "info@sydneyharbour.com.au",
          website: "https://sydneyharbour.com.au",
        },
        specifications: {
          maxBoatLength: 85,
          depth: 13,
          electricity: true,
          water: true,
          wifi: true,
          fuel: false,
          security: true,
        },
      },
      {
        id: "6",
        name: "Porto Cervo Marina",
        portType: "marina" as const,
        location: {
          lat: 41.1317,
          lng: 9.5378,
          city: "Porto Cervo",
          country: "Italy",
          address: "Via del Porto, 07021 Porto Cervo, Italy",
        },
        description:
          "Exclusive marina in Costa Smeralda, favored by luxury yacht owners and celebrities.",
        images: [
          "https://images.unsplash.com/photo-1582719471385-477bb200d50d?w=800",
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Fuel",
          "Concierge",
          "Security",
        ],
        capacity: 100,
        availableSpaces: 15,
        pricePerNight: 200,
        rating: 4.9,
        reviews: [],
        contact: {
          phone: "+39-0789-91553",
          email: "info@marinaportocervo.com",
          website: "https://marinaportocervo.com",
        },
        specifications: {
          maxBoatLength: 120,
          depth: 18,
          electricity: true,
          water: true,
          wifi: true,
          fuel: true,
          security: true,
        },
      },
      // Private Ports
      {
        id: "7",
        name: "Captain Mike's Private Dock",
        portType: "private_port" as const,
        location: {
          lat: 26.1224,
          lng: -80.1373,
          city: "Fort Lauderdale",
          country: "USA",
          address: "1520 SE 15th St, Fort Lauderdale, FL 33316",
        },
        description:
          "Private dock with personal service. Perfect for overnight stays with direct access to beautiful beaches.",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Private Beach Access",
          "BBQ Area",
        ],
        capacity: 3,
        availableSpaces: 2,
        pricePerNight: 65,
        rating: 4.8,
        reviews: [],
        contact: {
          phone: "+1-954-555-0187",
          email: "mike@privatecove.com",
        },
        owner: {
          name: "Captain Mike Thompson",
          email: "mike@privatecove.com",
          phone: "+1-954-555-0187",
        },
        isInstantBook: true,
        specifications: {
          maxBoatLength: 45,
          depth: 8,
          electricity: true,
          water: true,
          wifi: true,
          fuel: false,
          security: false,
        },
      },
      {
        id: "8",
        name: "Villa Bella Vista Private Port",
        portType: "private_port" as const,
        location: {
          lat: 44.3364,
          lng: 8.8137,
          city: "Portofino",
          country: "Italy",
          address: "Via del Fondaco, 16034 Portofino, Italy",
        },
        description:
          "Exclusive private dock at a luxury villa with stunning Mediterranean views and personalized concierge service.",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
        ],
        amenities: [
          "WiFi",
          "Electricity",
          "Water",
          "Concierge Service",
          "Villa Access",
          "Private Chef Available",
        ],
        capacity: 2,
        availableSpaces: 1,
        pricePerNight: 250,
        rating: 5.0,
        reviews: [],
        contact: {
          phone: "+39-0185-269-020",
          email: "info@villabellavista.it",
        },
        owner: {
          name: "Giuseppe Rossi",
          email: "giuseppe@villabellavista.it",
          phone: "+39-0185-269-020",
        },
        isInstantBook: false,
        specifications: {
          maxBoatLength: 60,
          depth: 12,
          electricity: true,
          water: true,
          wifi: true,
          fuel: false,
          security: true,
        },
      },
      {
        id: "9",
        name: "Serenity Cove Private Mooring",
        portType: "private_port" as const,
        location: {
          lat: 18.3381,
          lng: -64.8941,
          city: "St. John",
          country: "US Virgin Islands",
          address: "Cruz Bay, St. John, VI 00830",
        },
        description:
          "Peaceful private mooring in a protected cove with crystal clear waters and snorkeling right off your boat.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800",
        ],
        amenities: [
          "Fresh Water",
          "Kayak Rental",
          "Snorkeling Gear",
          "Beach Access",
          "Eco-Friendly",
        ],
        capacity: 1,
        availableSpaces: 1,
        pricePerNight: 85,
        rating: 4.9,
        reviews: [],
        contact: {
          phone: "+1-340-555-0143",
          email: "info@serenitycove.vi",
        },
        owner: {
          name: "Sarah & David Johnson",
          email: "sarah@serenitycove.vi",
          phone: "+1-340-555-0143",
        },
        isInstantBook: true,
        specifications: {
          maxBoatLength: 35,
          depth: 15,
          electricity: false,
          water: true,
          wifi: false,
          fuel: false,
          security: false,
        },
      },
    ];

    return mockPorts;
  }
);

export const fetchPortById = createAsyncThunk(
  "ports/fetchPortById",
  async (portId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // This would fetch specific port data
    return null;
  }
);

const portsSlice = createSlice({
  name: "ports",
  initialState,
  reducers: {
    setSelectedPort: (state, action: PayloadAction<Port | null>) => {
      state.selectedPort = action.payload;
    },
    setSearchFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.searchFilters = action.payload;
      // Apply filters to ports
      state.filteredPorts = state.ports.filter((port) => {
        const filters = action.payload;

        if (filters.minPrice && port.pricePerNight < filters.minPrice)
          return false;
        if (filters.maxPrice && port.pricePerNight > filters.maxPrice)
          return false;
        if (filters.rating && port.rating < filters.rating) return false;
        if (
          filters.boatLength &&
          port.specifications.maxBoatLength < filters.boatLength
        )
          return false;

        if (filters.amenities && filters.amenities.length > 0) {
          const hasAllAmenities = filters.amenities.every((amenity) =>
            port.amenities.includes(amenity)
          );
          if (!hasAllAmenities) return false;
        }

        return true;
      });
    },
    setMapBounds: (state, action: PayloadAction<MapBounds>) => {
      state.mapBounds = action.payload;
    },
    clearFilters: (state) => {
      state.searchFilters = {};
      state.filteredPorts = state.ports;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPorts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPorts.fulfilled, (state, action) => {
        state.loading = false;
        state.ports = action.payload;
        state.filteredPorts = action.payload;
      })
      .addCase(fetchPorts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch ports";
      });
  },
});

export const { setSelectedPort, setSearchFilters, setMapBounds, clearFilters } =
  portsSlice.actions;

export default portsSlice.reducer;
