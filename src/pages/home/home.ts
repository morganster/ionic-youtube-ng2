import { Component } from '@angular/core';



import { NavController,LoadingController } from 'ionic-angular';

import { YoutubeService } from '../../services/youtube.service'
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[YoutubeService,PlayerService]
})
export class HomePage {
  vPlayer = true;
  videos = {};
  search = {
    params:''
  };


  constructor(public navCtrl: NavController,public player: PlayerService,public youtubeService: YoutubeService,public loadingCtrl:LoadingController) {
    player.setupPlayer();
  }
  findVideos($event){
    let loading = this.loadingCtrl.create({
    });
            loading.present();

    this.youtubeService.getVideos(this.search.params).subscribe(
      videos => {
        this.videos=videos;
        loading.dismiss();
      },
      err=>{
        console.log(err);
      }
    );
  }
  baseUrl:string = 'https://www.youtube.com/embed/';

  playVideo(id){
    this.player.launchPlayer(id)
    this.vPlayer = true; 
   
  }

}
