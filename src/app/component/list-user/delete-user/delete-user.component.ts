import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() data;
  @Output() output = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private endpointFactory:EndpointFactory) { }

  ngOnInit() {
  }
  clickClose(){
    this.activeModal.close();
  }
  clickDelete(){
    let params=this.data.data.userId;
    this.endpointFactory.deleteEndPoint(params, "users/"+params).subscribe(data => {
      if (data.status === "success") {
        this.output.emit("success");
        this.activeModal.close();
      };
    }
    );
  }
}
