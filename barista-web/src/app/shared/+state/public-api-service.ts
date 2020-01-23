/**
 * An interface to ensure that an implementation exposes an ApiService for convenience.
 */
export interface PublicApiService {
  /**
   * An ApiService instance from @app/shared/api.
   * The OpenApi Generator does not make these conform to any interface so there is no common type to provide.
   */
  apiService: any;
}
