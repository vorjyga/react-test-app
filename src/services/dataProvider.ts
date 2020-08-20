export class DataProvider {
    private baseUrl = '';

    protected constructLink(url: string): string {
        return this.baseUrl + url;
    }
    protected async get<T>(url: string, params?: RequestInit): Promise<T> {

        try {
            const response = await fetch(this.constructLink(url), params);
            if (!response.ok) {
                // eslint-disable-next-line
                throw response;
            }
            return await response.json();
        } catch (error) {
            // eslint-disable-next-line
            throw {
                status: error.status,
                text: error.statusText,
            }
        }
    }
}
