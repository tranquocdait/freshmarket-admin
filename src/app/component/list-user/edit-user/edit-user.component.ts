import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    roleList: any;
    imageBase64: string;
    messageErrorArray = { corfirmPassword: "Nhập lại mật khẩu không đúng" };
    messageError: any;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
    }

    @Input() data;
    @Output() output = new EventEmitter();
    editForm: FormGroup;

    ngOnInit(): void {
        this.getRole();
        this.createForm();
    }

    getRole(): void {
        this.endpointFactory.getEndPoint('roles').subscribe(data => {
            if (data.status === 'success') {
                this.roleList = data.data;
            }
        }
        );
    }

    createForm(): void {
        if (this.data.type === 'edit') {
            this.modeEdit();
        } else {
            this.modeAdd();
        }
    }

    modeAdd(): void {
        this.editForm = this.formBuilder.group({
            userId: ['', Validators.required],
            userName: ['', Validators.required],
            role: ['', Validators.required],
            fullName: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.required],
            avatarURL: ['', Validators.required]
        });
    }

    modeEdit(): void {
        this.editForm = this.formBuilder.group({
            userId: [this.data.data.userId, Validators.required],
            userName: [this.data.data.userName, Validators.required],
            role: [this.data.data.role.roleID, Validators.required],
            fullName: [this.data.data.fullName, Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            phoneNumber: [this.data.data.phoneNumber, Validators.required],
            email: [this.data.data.email, Validators.required],
            avatarURL: ['', Validators.required]
        });
    }

    clickClose(): void {
        this.activeModal.close();
    }

    changeToBase64(event): void {
        const files = event.target.files;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(files[0]);
    }

    _handleReaderLoaded(readerEvt) {
        this.imageBase64 = readerEvt.target.result;
    }

    onSubmit(): void {
        const params: any = {
            userName: this.editForm.value['userName'],
            fullName: this.editForm.value['fullName'],
            imageBase64: this.imageBase64,
            password: this.editForm.value['password'],
            phoneNumber: this.editForm.value['phoneNumber'],
            roleID: Number.parseInt(this.editForm.value['role']),
            email: this.editForm.value['email'],
        };
        if (this.data.type !== 'edit') {
            this.endpointFactory.postEndPoint(params, 'users').subscribe(data => {
                if (data.status === 'success') {
                    this.output.emit('success');
                    this.activeModal.close();
                }
            }, error => {
            });
        } else {
            this.endpointFactory.putEndPoint(params, 'users/' + this.data.data.userId).subscribe(data => {
                if (data.status === 'success') {
                    this.output.emit('success');
                    this.activeModal.close();
                }
            });
        }
    }
    checkForm(): boolean {
        if (this.editForm.value['confirmPassword'].length > 6) {
            if (this.editForm.value['password'] !== this.editForm.value['confirmPassword']) {
                this.messageError = this.messageErrorArray.corfirmPassword;
                return false;
            }
        }
        return true;
    }

}
