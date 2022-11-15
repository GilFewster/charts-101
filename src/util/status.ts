export enum Status {
  /**
   * Idle means that there is no data and that it is available to load.
   * Idle transitions to 'Loading' only.
   */
  Idle,

  /**
   * Loading indicates that the DataStatus is populating its data for the first time.
   * Loading transitions to 'Ready' or 'Failed'.
   */
  Loading,

  /**
   * Stale means that there is data, but it should be reloaded.
   * Stale transitions to 'Loading' or 'Updating'.
   */
  Stale,

  /**
   * Ready indicates the DataStatus is populated with non-null, defined data.
   * Ready transitions to 'Stale' or 'Updating'.
   */
  Ready,

  /**
   * Updating indicates the DataStatus is populated with non-null, defined data which
   * may be in the process of being submitted to the backend, or may be in the process
   * of being refreshed.
   */
  Updating,

  /**
   * Complete indicates the DataStatus has successfully finished whatever it is there to do.
   * e.g. The entity has been deleted, or, the entity has been created. Usually a
   * UI will watch for this, and navigate to a new page when it is encountered.
   */
  Complete,

  /**
   * The application has encountered an error which can be handled in a way that is
   * meaningful to the user. This information will be carried in the 'messages' property.
   */
  Failed,
}
