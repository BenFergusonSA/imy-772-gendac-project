export class LoaderStateModel {
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor() {
  }

  startLoader() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';
  }

  onSuccess() {
    this.isLoading = false;
  }

  onFailure(errorMessage: string) {
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = errorMessage;
  }
}
