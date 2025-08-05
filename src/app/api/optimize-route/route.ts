import { NextRequest, NextResponse } from "next/server";

interface Destination {
  id: string;
  name: string;
  placeId: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface RouteRequest {
  origin: {
    lat: number;
    lng: number;
  };
  destinations: Destination[];
}

// Calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Create distance matrix
function createDistanceMatrix(
  origin: { lat: number; lng: number },
  destinations: Destination[]
): number[][] {
  const allPoints = [origin, ...destinations.map((d) => d.location)];
  const matrix: number[][] = [];

  for (let i = 0; i < allPoints.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < allPoints.length; j++) {
      if (i === j) {
        matrix[i][j] = 0;
      } else {
        matrix[i][j] = calculateDistance(
          allPoints[i].lat,
          allPoints[i].lng,
          allPoints[j].lat,
          allPoints[j].lng
        );
      }
    }
  }

  return matrix;
}

// Traveling Salesman Problem solver using nearest neighbor heuristic
function solveTSP(distanceMatrix: number[][]): {
  route: number[];
  totalDistance: number;
} {
  const n = distanceMatrix.length;
  if (n <= 2) {
    return { route: Array.from({ length: n }, (_, i) => i), totalDistance: 0 };
  }

  const visited = new Array(n).fill(false);
  const route = [0]; // Start from origin (index 0)
  visited[0] = true;
  let totalDistance = 0;

  let currentCity = 0;

  // Visit all cities using nearest neighbor
  for (let i = 1; i < n; i++) {
    let nearestCity = -1;
    let nearestDistance = Infinity;

    for (let j = 1; j < n; j++) {
      // Skip origin (index 0) for intermediate stops
      if (!visited[j] && distanceMatrix[currentCity][j] < nearestDistance) {
        nearestCity = j;
        nearestDistance = distanceMatrix[currentCity][j];
      }
    }

    if (nearestCity !== -1) {
      route.push(nearestCity);
      visited[nearestCity] = true;
      totalDistance += nearestDistance;
      currentCity = nearestCity;
    }
  }

  // Return to origin
  totalDistance += distanceMatrix[currentCity][0];
  route.push(0);

  return { route, totalDistance };
}

// Improved TSP solver using 2-opt optimization
function optimizeWith2Opt(
  distanceMatrix: number[][],
  initialRoute: number[]
): { route: number[]; totalDistance: number } {
  let bestRoute = [...initialRoute];
  let bestDistance = calculateRouteDistance(distanceMatrix, bestRoute);
  let improved = true;

  while (improved) {
    improved = false;

    for (let i = 1; i < bestRoute.length - 2; i++) {
      for (let j = i + 1; j < bestRoute.length - 1; j++) {
        if (j - i === 1) continue; // Skip adjacent edges

        const newRoute = [...bestRoute];
        // Reverse the segment between i and j
        const segment = newRoute.slice(i, j + 1).reverse();
        newRoute.splice(i, j - i + 1, ...segment);

        const newDistance = calculateRouteDistance(distanceMatrix, newRoute);

        if (newDistance < bestDistance) {
          bestRoute = newRoute;
          bestDistance = newDistance;
          improved = true;
        }
      }
    }
  }

  return { route: bestRoute, totalDistance: bestDistance };
}

function calculateRouteDistance(
  distanceMatrix: number[][],
  route: number[]
): number {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += distanceMatrix[route[i]][route[i + 1]];
  }
  return totalDistance;
}

export async function POST(request: NextRequest) {
  try {
    const body: RouteRequest = await request.json();
    const { origin, destinations } = body;

    if (!origin || !destinations || destinations.length < 1) {
      return NextResponse.json(
        {
          error:
            "Invalid request. Origin and at least one destination required.",
        },
        { status: 400 }
      );
    }

    // Create distance matrix
    const distanceMatrix = createDistanceMatrix(origin, destinations);

    // Solve TSP using nearest neighbor
    const initialSolution = solveTSP(distanceMatrix);

    // Optimize using 2-opt
    const optimizedSolution = optimizeWith2Opt(
      distanceMatrix,
      initialSolution.route
    );

    // Convert route indices back to destinations (excluding origin indices)
    const optimizedRoute = optimizedSolution.route
      .slice(1, -1) // Remove first and last (both are origin)
      .map((index) => destinations[index - 1]); // Adjust for origin being index 0

    // Estimate duration (assuming average speed of 50 km/h)
    const totalDuration = (optimizedSolution.totalDistance / 1000 / 50) * 3600; // in seconds

    return NextResponse.json({
      route: optimizedRoute,
      totalDistance: optimizedSolution.totalDistance,
      totalDuration: totalDuration,
    });
  } catch (error) {
    console.error("Error optimizing route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
