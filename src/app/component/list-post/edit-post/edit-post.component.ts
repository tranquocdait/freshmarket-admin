import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  calculationUnitList: any;
  provinceList: any;
  categoryList: any;
  imageBase64: string;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
  }

  @Input() data;
  @Output() output = new EventEmitter();
  editForm: FormGroup;

  ngOnInit(): void {
    this.getCalculationUnit();
    this.getProvince();
    this.getCategory();
    this.createForm();
  }

  getCalculationUnit() {
    this.endpointFactory.getEndPoint('caculationUnits').subscribe(data => {
      if (data.status === 'success') {
        this.calculationUnitList = data.data;
      }
      ;
    }
    );
  }
  getCategory() {
    this.endpointFactory.getEndPoint('categories').subscribe(data => {
      if (data.status === 'success') {
        this.categoryList = data.data;
      }
      ;
    }
    );
  }
  getProvince() {
    this.endpointFactory.getEndPoint('provinces').subscribe(data => {
      if (data.status === 'success') {
        this.provinceList = data.data;
      }
      ;
    }
    );
  }

  createForm() {
    if (this.data.type === 'edit') {
      this.modeEdit();
    }
  }

  modeEdit() {
    this.editForm = this.formBuilder.group({
      postId: [this.data.data.postId, Validators.required],
      userName: [this.data.data.userName, Validators.required],
      postName: [this.data.data.postName, Validators.required],
      unitPrice: [this.data.data.unitPrice, Validators.required],
      address: [this.data.data.address, Validators.required],
      description: [this.data.data.description, Validators.required],
      province: [this.data.data.province.id, Validators.required],
      imageURL: ['', Validators.required],
      calculationUnit: [this.data.data.calculationUnit.id, Validators.required],
      category: [this.data.data.category.id, Validators.required],
      //category:['', Validators.required]
    });
  }

  clickClose() {
    this.activeModal.close();
  }

  changeToBase64(event) {
    let files = event.target.files;
    let reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(files[0]);
  }

  _handleReaderLoaded(readerEvt) {
    this.imageBase64 = readerEvt.target.result;
  }

  onSubmit() {
    let params: any = {
      postId: this.editForm.value['postId'],
      postName: this.editForm.value['postName'],
      userName: this.editForm.value['userName'],
      unitPrice:Number.parseFloat(this.editForm.value['unitPrice']),
      address:this.editForm.value['address'],
      description:this.editForm.value['description'],
      provinceID: parseInt(this.editForm.value['province']),
      calculationUnitID: parseInt(this.editForm.value['calculationUnit']),
      categoryID: parseInt(this.editForm.value['category']),
      imageBase64: this.imageBase64,
    };
    {
      this.endpointFactory.putEndPoint(params, 'posts/' + this.data.data.postId).subscribe(data => {
        if (data.status === 'success') {
          this.output.emit('success');
          this.activeModal.close();
        }
        ;
      }
      );
    }
  }
}
