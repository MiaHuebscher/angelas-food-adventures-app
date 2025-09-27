// RestaurantFilters.tsx
import React from "react";

interface RestaurantFiltersProps {
    cuisineFilter: string;
    ratingFilter: string;
    cityTextFilter: string;
    stateFilter: string;
    countryFilter: string;
    sourceFilter: string;
    searchText: string;
    showFilters: boolean;
    uniqueCuisines: string[];
    uniqueRatings: string[];
    uniqueStates: string[];
    uniqueCountry: string[];
    uniqueSources: string[];
    setCuisineFilter: (val: string) => void;
    setRatingFilter: (val: string) => void;
    setCityTextFilter: (val: string) => void;
    setStateFilter: (val: string) => void;
    setCountryFilter: (val: string) => void;
    setSourceFilter: (val: string) => void;
    setSearchText: (val: string) => void;
    setShowFilters: (val: boolean) => void;
    clearAllFilters: () => void;
}

export default function RestaurantFilters({
    cuisineFilter,
    ratingFilter,
    cityTextFilter,
    stateFilter,
    countryFilter,
    sourceFilter,
    searchText,
    showFilters,
    uniqueCuisines,
    uniqueRatings,
    uniqueStates,
    uniqueCountry,
    uniqueSources,
    setCuisineFilter,
    setRatingFilter,
    setCityTextFilter,
    setStateFilter,
    setCountryFilter,
    setSourceFilter,
    setSearchText,
    setShowFilters,
    clearAllFilters} : RestaurantFiltersProps) {
    return (
        <div className="mb-3">
            {/* Toggle for mobile */}
            <div className="d-md-none mb-2 text-end">
                <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowFilters(!showFilters)}
                >
                {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
                </button>
            </div>

            {/* Filter Chips when hidden */}
            {(!showFilters && (cuisineFilter || ratingFilter || searchText || cityTextFilter || stateFilter || countryFilter || sourceFilter)) && (
                <div className="d-flex flex-wrap gap-2 mb-3">
                {searchText && (
                    <span className="badge bg-info d-flex align-items-center">
                    🔍 {searchText}
                    <button
                        className="btn-close btn-close-white ms-2"
                        onClick={() => setSearchText("")}
                        style={{ fontSize: "0.6rem" }}
                    />
                    </span>
                )}
                {cuisineFilter && (
                    <span className="badge bg-success d-flex align-items-center">
                    🍽 {cuisineFilter}
                    <button
                        className="btn-close btn-close-white ms-2"
                        onClick={() => setCuisineFilter("")}
                        style={{ fontSize: "0.6rem" }}
                    />
                    </span>
                )}
                {ratingFilter && (
                    <span className="badge bg-warning text-dark d-flex align-items-center">
                    ⭐ {ratingFilter}
                    <button
                        className="btn-close ms-2"
                        onClick={() => setRatingFilter("")}
                        style={{ fontSize: "0.6rem" }}
                    />
                    </span>
                )}
                <span
                    className="badge bg-secondary"
                    style={{ cursor: "pointer" }}
                    onClick={clearAllFilters}
                >
                    ✖ Clear All
                </span>
                </div>
            )}

            {/* Filters Row */}
            <div
                className={`d-${showFilters ? "flex" : "none"} flex-wrap align-items-center gap-3 flex-column flex-md-row`}
            >
                {/* Search Restuarant */}
                <input
                type="text"
                className="form-control w-100 w-md-auto"
                placeholder="Search Restaurant"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />

                {/* Food Type */}
                <select
                className="form-select w-100 w-md-auto"
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                >
                <option value="">All Cuisines</option>
                {uniqueCuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
                </select>

                {/* Rating */}
                <select
                className="form-select w-100 w-md-auto"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                >
                <option value="">All Ratings</option>
                {uniqueRatings.map((rating) => (
                    <option key={rating} value={rating}>{rating}</option>
                ))}
                </select>

                {/* Search City */}
                <input
                type="text"
                className="form-control w-100 w-md-auto"
                placeholder="Search Restaurant"
                value={searchText}
                onChange={(e) => setCityTextFilter(e.target.value)}
                />

                {/* State */}
                <select
                className="form-select w-100 w-md-auto"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                >
                <option value="">All States</option>
                {uniqueStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                ))}
                </select>
                
                {/* Country */}
                <select
                className="form-select w-100 w-md-auto"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                >
                <option value="">All Countries</option>
                {uniqueCountry.map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
                </select>

                {/* Source */}
                <select
                className="form-select w-100 w-md-auto"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                >
                <option value="">All Sources</option>
                {uniqueSources.map((source) => (
                    <option key={source} value={source}>{source}</option>
                ))}
                </select>

                {/* Clear Filters */}
                <button
                className="btn btn-outline-secondary w-100 w-md-auto"
                onClick={clearAllFilters}
                >
                Clear Filters
                </button>
            </div>
        </div>
    );
}