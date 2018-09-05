import { Component, PLATFORM_ID, Injector, Inject } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { createSSRSearchClient, parseServerRequest } from 'angular-instantsearch';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angu6-algolia';

  public instantSearchConfig: any;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const req = isPlatformServer(this.platformId)
      ? this.injector.get("request")
      : undefined;

    const searchParameters = parseServerRequest(req);

    this.instantSearchConfig = {
      searchParameters,
      indexName: "ikea",
      urlSync: true,
      searchClient: createSSRSearchClient({
        makeStateKey,
        HttpHeaders,
        transferState: this.transferState,
        httpClient: this.httpClient,
        appId: "latency",
        apiKey: "6be0576ff61c053d5f9a3225e2a90f76"
      })
    };

    console.log(this.instantSearchConfig);

  }

}
