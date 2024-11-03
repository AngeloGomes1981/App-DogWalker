import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'ol/ol.css'; // Importando o CSS do OpenLayers
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit, AfterViewInit {
  map!: Map;
  latitude: number | undefined;
  longitude: number | undefined;

  constructor() {}

  ngOnInit() {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.initializeMap();
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() {
    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([this.longitude, this.latitude]),
          zoom: 12,
        }),
      });
    }
  }
}

