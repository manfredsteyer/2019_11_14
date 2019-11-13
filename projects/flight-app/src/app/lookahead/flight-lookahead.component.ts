import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, interval, combineLatest, of, Subject } from 'rxjs';
// import { combineLatest } from 'rxjs/operators';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, filter, share, shareReplay, delay, mergeMap, exhaustMap, concatMap, catchError, takeUntil } from 'rxjs/operators';
import { _do } from "rxjs/operator/do";
import { Flight } from '@flight-workspace/flight-api';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})

export class FlightLookaheadComponent implements OnInit, OnDestroy {

    private closeSubj = new Subject<void>();

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading: boolean = false;

    online: boolean = false;
    online$: Observable<boolean>;

    constructor(private http: HttpClient) {
    }

    ngOnDestroy(): void {
        this.closeSubj.next();
    }
    
    ngOnInit() {
        this.control = new FormControl();

        const debouncedInput$ = this.control.valueChanges.pipe(debounceTime(300));

        this.online$ 
                = interval(2000).pipe(
                        startWith(0),
                        // map(_ => Math.random() < 0.5),
                        map(_ => true),
                        distinctUntilChanged(),
                        shareReplay(1),
                        // tap(value => this.online = value) // tap ist nicht schön!
                );

        this.flights$ = combineLatest(debouncedInput$, this.online$).pipe(
            filter(([_, online]) => online),
            map(([value]) => value),
            tap(v => this.loading = true), // tap ist nicht schön!
            switchMap(name => this.load(name)),
            tap(v => this.loading = false), // tap ist nicht schön!
            takeUntil(this.closeSubj)
        );


    }

    load(from: string)  {
        let url = "http://www.angular.at/api/flight";

        let params = new HttpParams()
                            .set('from', from);

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers})
                    .pipe(catchError(err => of([])))

    };


}
