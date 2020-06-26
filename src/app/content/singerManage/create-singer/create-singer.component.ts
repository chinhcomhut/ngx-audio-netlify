import { Component, OnInit } from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {FormControl, FormGroup} from "@angular/forms";
import {SingerService} from "../../../service/singerService/singer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-singer',
  templateUrl: './create-singer.component.html',
  styleUrls: ['./create-singer.component.css']
})
export class CreateSingerComponent implements OnInit {

    title = 'Thêm Ca Sĩ';

    singerForm: FormGroup;
    singer: Partial<SingerInfo>;

    constructor(
        private router: Router,
        private singerService: SingerService) {
        this.singerForm = new FormGroup({
            nameSinger: new FormControl(''),
            avatarSinger: new FormControl(''),
            singerBirthday: new FormControl(''),
            singerNation: new FormControl(''),
            description: new FormControl(''),
        });
        this.singer = {
            nameSinger: '',
            avatarSinger: '',
            information: '',
            // songs: []
        };
    }

    ngOnInit() {
    }

    onAvatar($event) {
        this.singer.avatarSinger = $event;
    }

    createSinger() {
        console.log(this.singer);
        this.singerService.createSinger(this.singer).subscribe(() => {
                alert('Bạn đã thêm thành công Ca Sĩ');
                this.router.navigate(['/list-singer']);
            }, error => {
                console.log(error),
                    alert('Bạn chưa thêm thành công');
            }
        );
    }

}
