import { Component } from '@angular/core';
import { SpacexList } from './app.model';
import { ApiServices } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public spacexList: Array<SpacexList> = [];
  launch_success:boolean=false
  land_success:boolean=false
  launch_year:string=""
  yearArray = [ 2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016 ]
  constructor( private _apiServices: ApiServices) { }

  ngOnInit() {
    this.getSpaceXList();
  }
 
  updateFilter(key, value) {
    if(key=="launch_success"){
      this.launch_success=value
    }
    else if(key=="land_success"){
      this.land_success=value
    }
    else if(key=="launch_year"){
      this.launch_year=value
    }
    this.getSpaceXList();
  }
  
  getSpaceXList() {
    var optional = ""
    if (this.launch_success) {
      optional =optional + "&launch_success=true" 
    }
    if (this.land_success) {
      optional =optional + "&land_success=true" 
    }
    if (this.launch_year != '') {
      optional = optional + '&launch_year=' + this.launch_year
    }
    this._apiServices.getSpacex({optional: optional}).subscribe((response: any) => 
    {
      if (response) {
        let spacexObj = new SpacexList ();
        response.map((x => {
          spacexObj = x;
          spacexObj.image = x.links.mission_patch;
          spacexObj.land_success = x.rocket.first_stage.cores[0].land_success;
          spacexObj.missionId = x.mission_id.length > 0 ? x.mission_id[0] : '' ;
          this.spacexList.push(spacexObj);
        }));
      }
    }, (error) => {

    });
  }
  /* ...........................completed ........................................ */

}

