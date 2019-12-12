<template>
    <div>
      <div class="content err-cell">
        <error-page></error-page>
      </div>
       <div class="content err-cell">
        <error-page :statuCode="404" :statuDesc="'这个页面跑掉了'" :isJumping="true" :imgWidth="300" :router="'/home'" :routerDes="'数据表盘'" :count="5" ></error-page>
      </div>
        <div class="content">
            <i-button>Default</i-button>
            <i-button type="primary">Primary</i-button>
            <i-button type="ghost">Ghost</i-button>
            <i-button type="dashed">Dashed</i-button>
            <i-button type="text">Text</i-button>
            <i-button type="primary" shape="circle" size="small">Small</i-button>
            <br><br>
             <i-button disabled>Default(Disabled)</i-button>
            <i-button disabled type="primary">Primary(Disabled)</i-button>
            <i-button disabled type="info">信息按钮(Disabled)</i-button>
            <i-button disabled type="success">成功按钮(Disabled)</i-button>
            <i-button disabled type="warning">警告按钮(Disabled)</i-button>
            <i-button disabled type="error">错误按钮(Disabled)</i-button>
            <br><br>
            <i-button type="info">信息按钮</i-button>
            <i-button type="success">成功按钮</i-button>
            <i-button type="warning">警告按钮</i-button>
            <i-button type="error">错误按钮</i-button>
              <div>
                  <br><br>复选框：
            <CheckboxGroup v-model="social">
                <Checkbox label="twitter">
                    <span>Twitter</span>
                </Checkbox>
                <Checkbox label="facebook">
                    <span>Facebook</span>
                </Checkbox>
                <Checkbox label="github">
                    <span>Github</span>
                </Checkbox>
                <Checkbox label="snapchat">
                    <span>Snapchat</span>
                </Checkbox>
        </CheckboxGroup>
        </div>
            <div>
                <br><br>输入框：
                <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
                <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>

            <div>

            <br><br>
            表单：
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>

            </div>
            <div>
              <br><br>
              时间轴 <br>
               <Timeline>
                  <TimelineItem>
                      <p class="time">1976年</p>
                      <p class="content">Apple I 问世</p>
                  </TimelineItem>
                  <TimelineItem>
                      <p class="time">1984年</p>
                      <p class="content">发布 Macintosh</p>
                  </TimelineItem>
                  <TimelineItem>
                      <p class="time">2007年</p>
                      <p class="content">发布 iPhone</p>
                  </TimelineItem>
                  <TimelineItem>
                      <p class="time">2010年</p>
                      <p class="content">发布 iPad</p>
                  </TimelineItem>
                  <TimelineItem>
                      <p class="time">2011年10月5日</p>
                      <p class="content">史蒂夫·乔布斯去世</p>
                  </TimelineItem>
              </Timeline>
            </div>
            <div>
              开关<br>
                <iSwitch v-model="switch1" @on-change="change" />
                <iSwitch v-model="switch2" @on-change="change" />
                 <!-- <Switch loading :value="true" /> -->
            </div>
               <div>
              <br><br>
              表格（添加stripe为变成斑马表格）<br>
               <Table stripe :columns="columns1" :data="data1"></Table>
            </div>
             <div>
              <br><br>
              标签页<br>
                <Tabs type="card">
                  <TabPane label="标签一">标签一的内容</TabPane>
                  <TabPane label="标签二">标签二的内容</TabPane>
                  <TabPane label="标签三">标签三的内容</TabPane>
              </Tabs>
            </div>
            <div>
              <br><br>卡片<br>
              <div style="background:#eee;padding: 20px">
                <Card :bordered="false">
                    <p slot="title">No border title</p>
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
            </div>
            </div>
            <div>
              <br><br>modal框<br>
               <Button type="primary" @click="modal1 = true">Display dialog box</Button>
              <Modal
                  v-model="modal1"
                  title="Common Modal dialog box title"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  <p>Content of dialog</p>
                  <p>Content of dialog</p>
                  <p>Content of dialog</p>
              </Modal>
            </div>

        </div>
    </div>
</template>
<script>
import Switch from 'iview'
import errorPage from './error/errpage'
export default {
  data () {
    return {
      social: ['facebook', 'github'],
      value: '',
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        }],
      model1: '',
      switch1: true,
      switch2: false,
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      modal1: false
    }
  },
  created () {
    // debugger
  },
  components: {
    Switch,
    errorPage
  },
  methods: {
    // change (status) {
    //   this.$Message.info('开关状态：' + status);
    // }

    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
<style lang="less">
.content{
  margin-bottom: 20px;
}
.err-cell{
  height: 600px;
}
  div{
      // background-color : @primary-color;
  }
</style>
