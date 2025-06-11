import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Types for our auth state
interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

// Mock users for fallback authentication
const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@crm.com",
    firstName: "Admin",
    lastName: "User",
    gender: "male",
    image: "https://robohash.org/admin",
    token: "mock-token-admin-123",
  },
  {
    id: 2,
    username: "demo",
    password: "demo123",
    email: "demo@crm.com",
    firstName: "Demo",
    lastName: "User",
    gender: "female",
    image: "https://robohash.org/demo",
    token: "mock-token-demo-456",
  },
  {
    id: 3,
    username: "test",
    password: "test123",
    email: "test@crm.com",
    firstName: "Test",
    lastName: "User",
    gender: "male",
    image: "https://robohash.org/test",
    token: "mock-token-test-789",
  },
]

// Async thunk for login with fallback
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("🔐 Attempting login with:", credentials)

      // First try DummyJSON API
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 30,
          }),
        })

        const data = await response.json()
        console.log("🌐 DummyJSON API Response:", data)

        if (response.ok && data.token) {
          // Store token in localStorage
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data))
          console.log("✅ DummyJSON login successful")
          return data
        }
      } catch (apiError) {
        console.log("⚠️ DummyJSON API failed, trying mock auth:", apiError)
      }

      // Fallback to mock authentication
      console.log("🔄 Falling back to mock authentication")
      const mockUser = MOCK_USERS.find(
        (user) => user.username === credentials.username && user.password === credentials.password,
      )

      if (mockUser) {
        const { password, ...userWithoutPassword } = mockUser
        localStorage.setItem("token", mockUser.token)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        console.log("✅ Mock login successful")
        return userWithoutPassword
      }

      // If both fail
      return rejectWithValue("Invalid username or password. Try: admin/admin123, demo/demo123, or test/test123")
    } catch (error) {
      console.error("❌ Login error:", error)
      return rejectWithValue("Login failed. Please try again.")
    }
  },
)

// Async thunk to check if user is already logged in
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      return {
        token,
        ...JSON.parse(user),
      }
    }

    return rejectWithValue("No valid session")
  } catch (error) {
    return rejectWithValue("Session error")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Login failed"
        state.isAuthenticated = false
      })
      // Check auth cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
