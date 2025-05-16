export interface CarFormData {
  make: string;
  model: string;
  year: string;
}

export interface CarFormResult {
  make?: string;
  model?: string;
  year?: string;
}

export class CarFormManager {
  private static initialState: CarFormData = {
    make: '',
    model: '',
    year: '',
  };

  public static createFormDataFromResult(data: CarFormResult): CarFormData {
    return {
      make: data.make || '',
      model: data.model || '',
      year: data.year || '',
    };
  }

  public static updateField(
    currentData: CarFormData,
    field: keyof CarFormData,
    value: string,
  ): CarFormData {
    return {
      ...currentData,
      [field]: value,
    };
  }

  public static resetForm(): CarFormData {
    return {...this.initialState};
  }

  public static isEmptyResult(data: CarFormResult): boolean {
    return !data.make && !data.model && !data.year;
  }
}
