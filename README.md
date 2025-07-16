# 📦 RTK Query - Complete Guide for Beginners

## ✅ What is RTK Query?

RTK Query is a **data fetching and caching library** built on top of Redux Toolkit.
It helps manage **API requests, caching, synchronization, and state updates** automatically — reducing boilerplate.

---

## ✅ Why Use RTK Query?

* 🚀 **Reduces Redux boilerplate** (no need for manual actions/reducers).
* 🚀 **Automatic caching & refetching**.
* 🚀 **Auto-generated React Hooks** for each API endpoint.
* 🚀 **Optimized performance** (no unnecessary re-renders).
* 🚀 **Built-in loading/error tracking**.
* 🚀 **Integrated with Redux DevTools**.

---

## ✅ Basic Setup Example

### 1. Install Redux Toolkit and React-Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create API service:

```js
// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users']
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users']
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = api;
```

### 3. Configure Store:

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

### 4. Use Hook in React:

```js
import React from 'react';
import { useGetUsersQuery, useAddUserMutation } from './services/api';

function UsersComponent() {
  const { data, isLoading, error } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div>
      {data?.map(user => <p key={user.id}>{user.name}</p>)}
      <button onClick={() => addUser({ name: 'Sushanto' })}>Add User</button>
    </div>
  );
}
```

---

## ✅ Caching in RTK Query

* Stores data in **Redux store memory (Heap)**.
* Caches based on **endpoint name + query arguments**.
* Avoids re-fetching if data is still fresh.
* Supports:

  * **`keepUnusedDataFor`**: Retain data after component unmount.
  * **`refetchOnMountOrArgChange`**: Auto-refetch on arg changes or remount.

```js
useGetUsersQuery(undefined, {
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 60, // in seconds
});
```

### ✅ Cache Invalidation

* `providesTags` and `invalidatesTags` are used to **control cache refresh**.

---

## ✅ RTK Query Data Flow

```
Trigger Hook (Query/Mutation)
        ↓
 Check Redux Store Cache
        ↓
 - If fresh → Return cached data
 - Else → Make API request → Cache response
        ↓
Update React Components
```

---

## ✅ createSlice vs RTK Query

| Aspect       | `createSlice`               | `RTK Query`                  |
| ------------ | --------------------------- | ---------------------------- |
| Purpose      | Manage **local state**      | Manage **remote (API) data** |
| Manual Logic | Required for async fetch    | Not needed                   |
| Generated    | Reducers, Actions           | Hooks, Caching logic         |
| Caching      | Manual                      | Automatic                    |
| Best for     | UI toggles, counters, forms | API fetching, CRUD           |

---

## ✅ Benefits of RTK Query

* 🚀 Minimal Boilerplate
* 🚀 Built-in Caching & Invalidation
* 🚀 Auto-generated Hooks
* 🚀 Loading/Error states managed
* 🚀 Efficient Memory Usage
* 🚀 Redux DevTools Support
* 🚀 TypeScript Support
* 🚀 Supports SSR

---

## ✅ Bonus Tips

### 🔸 React Query vs RTK Query:

* **React Query:** Independent of Redux, great for standalone apps.
* **RTK Query:** Best for apps already using Redux.

### 🔸 Memory:

* Data is stored in **Heap memory via Redux store**.
* Garbage collected when unused after the set **keepUnusedDataFor** time.

---

## ✅ Example Project Structure

```
/src
  /app
    store.js
  /services
    api.js
  /components
    UsersComponent.jsx
```

---

## ✅ Common API Hooks

| Hook Name              | Purpose                 |
| ---------------------- | ----------------------- |
| `useGetXQuery()`       | Fetch data (GET)        |
| `useAddXMutation()`    | Add data (POST)         |
| `useUpdateXMutation()` | Update data (PUT/PATCH) |
| `useDeleteXMutation()` | Delete data             |

---

## ✅ Conclusion

RTK Query is a **game-changer for Redux apps** that need reliable data fetching, caching, and state management with less code and higher performance.

